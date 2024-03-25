import { TRPCError } from "@trpc/server";
import { EventUpcomingSchema, NewEventSchema } from "schemas";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  verifiedUserProcedure,
} from "~/server/api/trpc";

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
        orderBy: { createdAt: "desc" },
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
});
