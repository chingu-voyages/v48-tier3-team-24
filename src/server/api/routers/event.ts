import { TRPCError } from "@trpc/server";
import Error from "next/error";
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

  create: protectedProcedure
    .input(NewEventSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event
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
        .catch((e: TRPCError) => console.error(e.message));
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.event.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

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
