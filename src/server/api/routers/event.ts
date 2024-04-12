import { Prisma } from "@prisma/client";
import { createInputMiddleware } from "@trpc/server";
import { EventSchema } from "schemas";
import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z
        .object({
          name: z.string().min(1),
          description: z.string().min(1),
          startDateTime: z.date().min(new Date()),
          endDateTime: z.date(),
          address: z.string().min(1),
        })
        .refine((data) => {
          data.endDateTime > data.startDateTime,
            {
              message:
                "The event end datetime cannot be earlier than the event start datetime.",
              path: ["endDateTime"],
            };
        }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.event.create({
        data: {
          name: input.name,
          description: input.description,
          startDateTime: input.startDateTime,
          endDateTime: input.endDateTime,
          address: input.address,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.event.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getAllHostedEvents: protectedProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdById: ctx.session.user.id },
      include: {
        eventParticipants: {
          include: { user: true },
        },
        createdBy: true,
      },
    });
  }),

  getAllAttendingEvents: protectedProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        eventParticipants: {
          some: {
            id: ctx.session.user.id,
          },
        },
      },
      include: {
        eventParticipants: true,
        createdBy: true,
      },
    });
  }),

  createEvent: protectedProcedure
    .input(EventSchema)
    .mutation(async ({ ctx, input }) => {
      // has all data passed by the form except the User object
      const event: Prisma.EventCreateWithoutCreatedByInput = input;

      // creates the event and connects it to the session's user
      return await ctx.db.event.create({
        data: { ...event, createdBy: { connect: { id: ctx.session.user.id } } },
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
    adminGetEvents: adminProcedure.input(z.object({
      search: z.string().min(1),
    })).query(({ ctx, input }) => {
      const properties = Object.entries(EventSchema.shape)
      const output = properties.filter(([key, schema]) => schema instanceof z.ZodString).map(([key, val]) => ({
        [key]: { contains: input.search, mode: 'insensitive' }
      }))
      return ctx.db.event.findMany({
        orderBy: { createdAt: "desc" },
        where: { OR: [...output] },
        include: {
          createdBy: true
        }
      })
    }),
  adminCreateEvent: adminProcedure
    .input(EventSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.create({
        data: { ...input }
      })
    }),
  adminEditEvent: adminProcedure
    .input(EventSchema)
    .mutation(async({ctx, input}) => {
      return await ctx.db.event.update({
        data: input,
        where: {
          id: input.id
        }
      })
    }),
  adminDeleteEvent: adminProcedure
    .input(z.object({
      eventId: z.string(),
    }))
    .mutation(async({ctx, input})=> {
      return await ctx.db.event.delete({
        where: {
          id: input.eventId
        }
      })
    })
});
