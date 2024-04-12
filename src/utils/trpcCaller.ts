import { createCallerFactory } from "~/server/api/trpc";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import type { Session } from "next-auth";

/**
 * Create a trpc caller that can be used to invoke procedures on the server side.
 * @param {Session|null} session Next auth session to add to the inner context
 * @returns 
 */
export const createCaller = 
  (session:Session|null) => createCallerFactory(appRouter)(createInnerTRPCContext({session}));