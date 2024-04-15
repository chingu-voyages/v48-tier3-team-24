import { z } from "zod";
import { hash } from "~/utils/bcrypt";
import { randomUUID } from "crypto";
import {
  sendEmailVerification,
  sendUsernameRecovery,
  sendPasswordRecovery
} from "~/server/mail";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

const getBaseUrl = () => {
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const authRouter = createTRPCRouter({

  /**
   * The sign up procedure creates a new user account.
   * The account's email address needs to be verified before the account has access
   * to the full functionality of the application.
   * This procedure will generate a verification token and send a verification URL to
   * the email address that user provided in the input.
   * The verification token will be valid for 30 minutes
   * 
   * @param {string} username
   * @param {string} password
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
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
        const existingUser = await ctx.db.user.count({
          where: {
            username: input.username
          }
        }) > 0;
        const existingEmail = await ctx.db.user.count({
          where: {
            email: input.email
          }
        }) > 0;
        if(existingUser || existingEmail) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Username or email address already exists."
          });
        }
        const user = await ctx.db.user.create({
          data: input
        });
        // Get a datetime that is 30 minutes from now
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 30);
        const token = randomUUID();
        // Email verification URL
        const verifyUrl = `${getBaseUrl()}/verify-email/${token}`;

        // Create an email verification token
        await ctx.db.verificationToken.create({
          data: {
            identifier: user.id,
            token: token,
            expires: expires
          }
        });

        // Mail the email verify url to the email address
        await sendEmailVerification(input.email, verifyUrl);

        user.password = null;
        return user;
      } catch(error) {
        if(error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          cause: error
        });
      }
    }),

  /**
   * This procedure verifies user's account.
   * @param {UUID} token
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
            code: "NOT_FOUND",
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
            id: token.identifier,
            NOT: {
              username: null
            }
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
            message: "User not found or is a discord user"
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
    }),

  /**
   * Regenerate a verification token and send user
   * a new verification url.
   */
  resendEmailVerification: protectedProcedure
    .mutation(async ({ctx}) => {
      try {
        const user = await ctx.db.user.findFirst({
          where: {
            id: ctx.session.user.id,
            name: null  // Exclude discord users
          }
        });
        if(!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found"
          });
        }
        if(user.emailVerified) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User verification completed"
          });
        }

        // Get a datetime that is 30 minutes from now
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 30);
        const token = randomUUID();
        // Email verification URL
        const verifyUrl = `${getBaseUrl()}/verify-email/${token}`;

        // Create an email verification token
        await ctx.db.verificationToken.create({
          data: {
            identifier: user.id,
            token: token,
            expires: expires
          }
        });
        if(user.email) {
          // Mail the email verify url to the email address
          await sendEmailVerification(user.email, verifyUrl);
        }
        return { message: "success" };
      } catch(error) {
        if(error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred."
        })
      }
    }),

  /**
   * Find user account by the given email address and send an email
   * to the user with their forgotten username.
   * 
   * @param {string} email email address
   */
  recoverUsername: publicProcedure
    .input(z.object({
      email: z.string().min(1).email()
    }))
    .mutation(async ({ctx, input}) => {
      try {
        const user = await ctx.db.user.findFirst({
          where: {
            email: input.email,
            NOT: {
              username: null
            }
          }
        });

        if(!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Email not found or is a discord user"
          });
        }

        // Mail the username
        if(user.username) await sendUsernameRecovery(input.email, user.username);

        return { success: true};
      } catch(error) {
        if(error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          cause: error
        });
      }
    }),

  /** 
   * Find user by the given username and then send an email to the user
   * with a password reset link.
   * 
   * @param {string} username
   */
  recoverPassword: publicProcedure
    .input(z.object({
      username: z.string().min(3).max(20)
    }))
    .mutation(async ({ctx, input}) => {
      try {
        const user = await ctx.db.user.findFirst({
          where: {
            username: input.username
          }
        });

        if(!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found or is a discord user"
          });
        }

        // Get a datetime that is 30 minutes from now
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 30);
        const token = randomUUID();
        const passwordResetUrl = `${getBaseUrl()}/reset-password/${token}?username=${input.username}`;

        // Create an password reset token
        await ctx.db.verificationToken.create({
          data: {
            identifier: user.id,
            token: token,
            expires: expires
          }
        });

        if(user.email) {
          // Mail the password recovery link
         await sendPasswordRecovery(user.email, passwordResetUrl);
        }

        return { success: true};
      } catch(error) {
        if(error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          cause: error
        });
      }
    }),

  /**
   * This procedure resets user's email address.
   * This procedure is for users that has forgotten their password and is unable to login.
   * It is not to be used for voluntary password reset.
   * This procedure is to be calld when user requests a password reset via email.
   * 
   * @param {UUID} token verification token
   * @param {string} password user's new password
   */
  resetPassword: publicProcedure
    .input(z.object({
      token: z.string().uuid(),
      password: z.string().min(8).max(20)
        // Hash the password
        .transform(async (val) => await hash(val))
    }))
    .mutation(async ({ctx, input}) => {
      try {
        // Find the verification token by the given token
        const token = await ctx.db.verificationToken.findFirst({
          where: {
            token: input.token
          }
        });
        if(!token) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Invalid token"
          });
        }
        if(token.expires < new Date()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Expired token"
          });
        }
        // Find the user from the Verification Token
        const user = await ctx.db.user.findFirst({
          where: {
            id: token.identifier,
            NOT: {
              username: null
            }
          }
        });
        // Remove the Verification Token as it has been used.
        await ctx.db.verificationToken.delete({
          where: {
            token: input.token
          }
        });
        if(!user) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User not found or is a discord user"
          });
        }
        // Reset user's password
        const updatedUser = await ctx.db.user.update({
          where: {
            id: user.id
          },
          data: {
            password: input.password
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
    }),
});