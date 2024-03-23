import { hash } from "~/utils/bcrypt";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";



export const userRouter = createTRPCRouter({
  update: protectedProcedure.input(z.object({
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20),
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(20).transform(async (val) => await hash(val)),
  })).mutation(async({ ctx, input }) => {
    try {
      return
    } catch(error) {
      if(error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          cause: error
        });
    }
  })
});