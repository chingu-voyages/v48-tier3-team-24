import { z } from "zod";
import { hash } from "~/utils/bcrypt";
import { randomUUID } from "crypto";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { env } from "~/env";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({

  /**
   * The sign up procedure creates a new user account.
   * The account's email address needs to be verified before the account has access
   * to the full functionality of the application.
   * This procedure will generate a verification token and send a verification URL to
   * the email address that user provided in the input.
   * The verification token will be valid for 30 minutes
   */
  signUp: publicProcedure
    .input(z.object({
      username: z.string().min(3).max(20),
      password: z.string().min(8).max(20)
        // Hash the password
        .transform(async (val) => await hash(val)),
      firstName: z.string().min(1).max(20),
      lastName: z.string().min(1).max(20),
      email: z.string().min(1).email()
    }))
    .mutation(async ({ctx, input}) => {
      try {
        const user = await ctx.db.user.create({
          data: input
        });

        // Get a datetime that is 30 minutes from now
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 30);
        const token = randomUUID();
        // Email verification URL
        const verifyUrl = `${env.NEXTAUTH_URL}/verify-email/${token}`;

        // Create an email verification token
        await ctx.db.verificationToken.create({
          data: {
            identifier: user.id,
            token: token,
            expires: expires
          }
        });

        // Mail the email verify url to the email address

        user.password = null;
        return user;
      } catch(error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          cause: error
        });
      }
    }),

  /**
   * This procedure verifies user's account.
   */
  verifyEmail: publicProcedure
    .input(z.object({
      token: z.string().uuid()
    }))
    .mutation(async ({ctx, input}) => {
      try {
        const token = await ctx.db.verificationToken.findFirst({
          where: {
            token: input.token
          }
        });
        if(!token) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid token"
          }); 
        }
        if(token.expires < new Date()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Expired token"
          });
        }
        const user = await ctx.db.user.findFirst({
          where: {
            id: token.identifier
          }
        });
        await ctx.db.verificationToken.delete({
          where: {
            token: input.token
          }
        });
        if(!user) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Expired token"
          });
        }
        const updatedUser = await ctx.db.user.update({
          where: {
            id: user.id
          },
          data: {
            emailVerified: new Date()
          }
        });
        updatedUser.password = null;
        return updatedUser;
      } catch(error) {
        if(error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred."
        })
      }
    })
});