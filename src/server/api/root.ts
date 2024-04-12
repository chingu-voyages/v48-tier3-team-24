import { eventRouter } from "~/server/api/routers/event";
import { authRouter } from "./routers/auth";
import { userRouter } from "./routers/user";
import { dashRouter } from "./routers/dash";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  auth: authRouter,
  user: userRouter,
  dash: dashRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
