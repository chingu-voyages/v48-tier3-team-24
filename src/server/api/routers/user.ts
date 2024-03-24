import { hash } from "~/utils/bcrypt";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import toast from "react-hot-toast";



export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(({ctx})=>{
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id
      }
    })
  }),
  update: protectedProcedure.input(z.object({
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20),
    username: z.string().min(3).max(20),
    // password: z.string().min(8).max(20).transform(async (val) => await hash(val)),
  })).mutation(async({ ctx, input }) => {
    try {
      const findUserByUsername = await ctx.db.user.findUnique({
        where: {
          username: input.username
        }
      })
      // check username exists except current user
      if ( findUserByUsername?.id != ctx.session.user.id ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already exists."
        });
      }
      return await ctx.db.user.update( {
        where: {
          id: ctx.session.user.id
        },
        data: {
          firstName: input.firstName,
          lastName: input.lastName
        }
      } )
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