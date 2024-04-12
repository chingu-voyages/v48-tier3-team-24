import { hash } from "~/utils/bcrypt";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { getBaseUrl } from "~/utils/base";
import { randomUUID } from "crypto";
import { sendChangeEmailVerification } from "~/server/mail";

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
  }),
  updatePassword: protectedProcedure.input(z.object({
    password: z.string().min(8).max(20).transform(async (val) => await hash(val)),
    confirmPassword: z.string().min(8).max(20).transform(async (val) => await hash(val))
  })).mutation(async({ctx, input})=>{
    try {
      return await ctx.db.user.update({
        where: {
          id: ctx.session.user.id
        },
        data : {
          password: input.password
        }
      })
    } catch (error) {
      if(error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred.",
        cause: error
      });
    }
  }),
  updateEmail: protectedProcedure.input(z.object({
    email: z.string().min(1).email()
  })).mutation(async({ctx, input})=>{
    try {
      // Get a datetime that is 30 minutes from now
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 30);
      const token = randomUUID();
      // Email verification URL
      const verifyUrl = `${getBaseUrl()}/verify-email/${token}`;

      // Create an email verification token
      await ctx.db.verificationToken.create({
        data: {
          identifier: ctx.session.user.id,
          token: token,
          expires: expires
        }
      });
       // Mail the email verify url to the email address
       await sendChangeEmailVerification(input.email, verifyUrl);

       // update user email and emailVerified
       const user = await ctx.db.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          email: input.email,
          emailVerified: null
        }
       })

       return {
        user
       }
    } catch (error) {
      if(error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred.",
        cause: error
      });
    }
  })
});