import { TRPCError } from "@trpc/server";
import { EventUpcomingSchema, NewEventSchema, EditEventSchema } from "schemas";
import type { Event } from "@prisma/client";
import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";

export interface ClientEvent extends Omit<Event, "startDateTime" | "endDateTime" | "createdAt" | "updatedAt"> {
  startDateTime: Date | string;
  endDateTime: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export const eventRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure.input(NewEventSchema).mutation(
    async ({ ctx, input }) =>
      await ctx.db.event
        .create({
          data: {
            ...input,
            price: Number.parseInt(input.price),
            createdBy: { connect: { id: ctx.session.user.id } },
            eventParticipants: {
              create: [
                {
                  createdAt: new Date(),
                  userId: ctx.session.user.id,
                },
              ],
            },
          },
        })
        .then((data) => data.id)
        .catch((e) => {
          if (e instanceof TRPCError) throw e;
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "you dun goofed",
          });
        }),
  ),

  getUpcomingEvents: protectedProcedure
    .output(EventUpcomingSchema)
    .query(({ ctx }) => {
      return ctx.db.event.findMany({
        orderBy: [{ startDateTime: "asc" }],
        where: { status: "UPCOMING" },
        select: {
          id: true,
          startDateTime: true,
          endDateTime: true,
          name: true,
          description: true,
          image: true,
          isPrivate: true,
          city: true,
          state: true,
        },
      });
    }),

  // adds a user to an existing event
  addUserToEvent: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.update({
        data: {
          eventParticipants: { connect: { id: ctx.session.user.id } },
        },
        where: {
          id: input.eventId,
        },
      });
    }),

  adminGetUserSelectList: adminProcedure
    .query(async ({ ctx }) => {
      try {
        const users = await ctx.db.user.findMany({
          select: {
            id: true,
            username: true,
            name: true
          }
        });
        return users;
      } catch(error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          cause: error
        });
      }
    }),

  adminGetPaginatedEvents: adminProcedure
    .input(z.object({
      perPage: z.number().min(1),
      page: z.number().min(1),
      search: z.string().min(1).max(50).nullable()
    }))
    .query(async ({ ctx, input }) => {
      try {
        const skip = (input.page - 1) * input.perPage;
        const take = input.perPage;

        // Get the total count of the filtered results.
        const total = await ctx.db.event.count({
          ...(input.search &&
          {
            where: {
              OR: [
                { name: { contains: input.search } },
                { description: { contains: input.search } }
              ]
            }
          })
        });
        const events = await ctx.db.event.findMany({
          skip,
          take,
          ...(input.search &&
          {
            where: {
              OR: [
                { name: { contains: input.search } },
                { description: { contains: input.search } }
              ]
            }
          }),
          orderBy: [
            { name: "asc" }
          ]
        });
        return {
          events,
          total
        }
      } catch(error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          cause: error
        });
      }
    }),

  adminCreateEvent: adminProcedure
    .input(NewEventSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.event.create({
          data: {
            ...input,
            price: Number(input.price),
            createdBy: {
              connect: {
                id: ctx.session.user.id
              }
            }
          }
        });
      } catch(error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          cause: error
        });
      }
    }),

  adminEditEvent: adminProcedure
    .input(EditEventSchema)
    .mutation(async({ctx, input}) => {
      try {
        return await ctx.db.event.update({
          data: {
            ...input,
            price: Number(input.price),
            createdBy: {
              connect: {
                id: ctx.session.user.id
              }
            }
          },
          where: {
            id: input.id
          }
        });
      } catch(error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          cause: error
        });
      }
    }),

  adminDeleteEvent: adminProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async({ctx, input})=> {
      try {
        await ctx.db.eventParticipants.deleteMany({
          where: {
            eventId: input.id
          }
        });
        return await ctx.db.event.delete({
          where: input
        });
      } catch(error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          cause: error
        });
      }
    })
});