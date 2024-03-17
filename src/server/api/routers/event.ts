import { createInputMiddleware } from "@trpc/server";
import { SessionSchema } from "schemas";
import { z } from "zod";

import {
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

  getAllHostedEvents: protectedProcedure
    .query(({ ctx }) => {
      return ctx.db.event.findMany({
        orderBy: { createdAt: "desc" },
        where: { createdById: ctx.session.user.id },
      });
    }),

  getAllAttendingEvents: protectedProcedure
    .query(({ ctx }) => {
      return ctx.db.event.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          eventParticipants: {
            some: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
});
