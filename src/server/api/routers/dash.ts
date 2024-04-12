import { TRPCError } from "@trpc/server";
import { CalendarEventsSchema, EventUpcomingSchema } from "schemas";

import {
  createTRPCRouter,
  protectedProcedure,
  verifiedUserProcedure,
} from "~/server/api/trpc";

export const dashRouter = createTRPCRouter({
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
  getUsersEvents: protectedProcedure
    .output(CalendarEventsSchema)
    .query(async ({ ctx }) => {
      try {
        return await ctx.db.user.findFirstOrThrow({
          select: {
            events: {
              select: {
                id: true,
                startDateTime: true,
                endDateTime: true,
                isPrivate: true,
                name: true,
                image: true,
                description: true,
              },
              orderBy: { startDateTime: "asc" },
            },
          },
          where: { id: ctx.session.user.id },
        });
      } catch {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
    }),
});
