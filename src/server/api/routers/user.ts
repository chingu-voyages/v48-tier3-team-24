import { hash } from "~/utils/bcrypt";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  adminProcedure
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { getBaseUrl } from "~/utils/base";
import { randomUUID } from "crypto";
import { sendChangeEmailVerification } from "~/server/mail";
import { Role } from "@prisma/client";

// @TODO Move this to output type schema file. This is a custom user type that exclude password
export interface ClientUser {
  name: string | null;
  id: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  emailVerified: Date | string | null;
  role: Role;
  image: string | null;
};

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(({ ctx }) => {
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
  })).mutation(async ({ ctx, input }) => {
    try {
      const findUserByUsername = await ctx.db.user.findUnique({
        where: {
          username: input.username
        }
      })
      // check username exists except current user
      if (findUserByUsername?.id != ctx.session.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already exists."
        });
      }
      return await ctx.db.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          firstName: input.firstName,
          lastName: input.lastName
        }
      })
    } catch (error) {
      if (error instanceof TRPCError) throw error;
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
  })).mutation(async ({ ctx, input }) => {
    try {
      return await ctx.db.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          password: input.password
        }
      })
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred.",
        cause: error
      });
    }
  }),

  updateEmail: protectedProcedure.input(z.object({
    email: z.string().min(1).email()
  })).mutation(async ({ ctx, input }) => {
    try {
      const existingEmail = await ctx.db.user.count({
        where: {
          email: input.email
        }
      }) > 0;
      if (existingEmail) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username or email address already exists."
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
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred.",
        cause: error
      });
    }
  }),

  getPaginatedUsers: adminProcedure
    .input(z.object({
      perPage: z.number().min(1),
      page: z.number().min(1),
      search: z.string().min(1).max(50).nullable()
    }))
    .query(async ({ ctx, input }) => {
      try {
        const skip = (input.page - 1) * input.perPage;
        const take = input.perPage;

        // Get the total count of the filtered results.
        const total = await ctx.db.user.count({
          ...(input.search &&
          {
            where: {
              OR: [
                { username: { contains: input.search } },
                { firstName: { contains: input.search } },
                { lastName: { contains: input.search } },
                { email: { contains: input.search } }
              ]
            }
          })
        });
        const users = await ctx.db.user.findMany({
          skip,
          take,
          select: {
            id: true,
            name: true,
            username: true,
            firstName: true,
            lastName: true,
            email: true,
            emailVerified: true,
            role: true,
            image: true
          },
          ...(input.search &&
          {
            where: {
              OR: [
                { username: { contains: input.search } },
                { firstName: { contains: input.search } },
                { lastName: { contains: input.search } },
                { email: { contains: input.search } }
              ]
            }
          }),
          orderBy: [
            { username: "asc" },
            { lastName: "asc" },
            { firstName: "asc" }
          ]
        });
        return {
          users,
          total
        }
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          cause: error
        });
      }
    }),

  adminDeleteUser: adminProcedure.input(z.object({
    id: z.string()
  })).mutation(async ({ ctx, input }) => {
    try {
      const user = await ctx.db.user.delete({
        where: {
          id: input.id
        }
      });
      return {
        user
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred.",
        cause: error
      });
    }
  }),

  adminAddUser: adminProcedure
    .input(z.object({
      username: z.string().min(3).max(20),
      firstName: z.string().min(1).max(20),
      lastName: z.string().min(1).max(20),
      role: z.enum(["USER", "ADMIN"]),
      email: z.string().min(1).email(),
      password: z.string().min(1).max(20).transform(async (val) => await hash(val))
    }))
    .mutation(async ({ ctx, input }) => {
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
        if (existingUser || existingEmail) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Username or email address already exists."
          });
        }
        // create user
        return await ctx.db.user.create({
          data: {
            username: input.username,
            firstName: input.firstName,
            lastName: input.lastName,
            role: input.role,
            email: input.email,
            password: input.password
          }
        })
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          cause: error
        });
      }
    }),

  adminEditUser: adminProcedure
    .input(z.object({
      id: z.string().min(1),
      username: z.string().min(3).max(20).nullable(),
      firstName: z.string().min(1).max(20),
      lastName: z.string().min(1).max(20),
      role: z.enum(["USER", "ADMIN"]),
      email: z.string().min(1).email(),
      password: z.string().min(8).max(20).nullable().transform(async (val) => val ? await hash(val) : null),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const existingUser = await ctx.db.user.findFirst({
          where: {
            id: input.id
          }
        });
        if (!existingUser) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User does not exist."
          });
        }
        if (input.username != null) {
          const existingUsername = await ctx.db.user.count({
            where: {
              username: input.username,
              NOT: { id: input.id }
            }
          })
          // check username exists except current user
          if (existingUsername) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Username already exists."
            });
          }
        }
        // update password if password not null
        if (input.password != null) {
          await ctx.db.user.update({
            where: {
              id: input.id
            },
            data: {
              password: input.password
            }
          });
        }
        // update user
        return await ctx.db.user.update({
          where: {
            id: input.id
          },
          data: {
            username: input.username,
            firstName: input.firstName,
            lastName: input.lastName,
            role: input.role,
            email: input.email
          }
        });
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          cause: error
        });
      }
    })
});