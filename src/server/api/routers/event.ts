import { EventUpcomingSchema } from "schemas";
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

  create: verifiedUserProcedure
    .input(
      z
        .object({
          name: z.string().min(1),
          description: z.string().min(1),
          startDateTime: z.date().min(new Date()),
          endDateTime: z.date(),
          streetAddress: z.string().min(1),
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
          streetAddress: input.streetAddress,
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

  getUpcomingEvents: protectedProcedure.output(EventUpcomingSchema).query(({ ctx }) => {
    return ctx.db.event.findMany({
      orderBy: { createdAt: "desc" },
      where: { status: "UPCOMING" },
      select: {
        id: true,
        startDateTime: true,
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
