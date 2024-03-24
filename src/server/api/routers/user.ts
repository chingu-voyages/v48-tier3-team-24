import {
  createTRPCRouter,
  adminProcedure
} from "~/server/api/trpc";
import { UserSchema } from "schemas";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { $Enums } from "@prisma/client";

// @TODO Move this to output type schema file. This is a custom user type that exclude password
export interface ClientUser {
  name: string | null;
  id: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  emailVerified: Date | string | null;
  role: $Enums.Role;
  image: string | null;
};

export const userRouter = createTRPCRouter({
  getPaginatedUsers: adminProcedure
    .input(z.object({
      perPage: z.number().min(1),
      page: z.number().min(1),
      search: z.string().min(1).max(50).nullable()
    }))
    .query(async ({ctx, input}) => {
      try {
        const skip = (input.page - 1) * input.perPage;
        const take = input.perPage;

        // Get the total count of the filtered results.
        const total =  await ctx.db.user.count({
          ...(input.search && 
          {
            where: {
              OR: [
                { username: {contains: input.search} },
                { firstName: {contains: input.search} },
                { lastName: {contains: input.search} },
                { email: {contains: input.search} }
              ]
            }
          })
        });
        const users =  await ctx.db.user.findMany({
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
                { username: {contains: input.search} },
                { firstName: {contains: input.search} },
                { lastName: {contains: input.search} },
                { email: {contains: input.search} }
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