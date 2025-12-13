import { z } from "zod";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
    me: protectedProcedure.query(({ ctx }) => {
        return ctx.db.user.findUnique({
            where: { id: ctx.session.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                createdAt: true,
                emailVerified: true,
            },
        });
    }),

    updateProfile: protectedProcedure
        .input(z.object({
            name: z.string().optional(),
            email: z.string().email().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            // If changing email, check if taken
            if (input.email && input.email !== ctx.session.user.email) {
                const exists = await ctx.db.user.findUnique({
                    where: { email: input.email },
                });
                if (exists) {
                    throw new TRPCError({
                        code: "CONFLICT",
                        message: "Email already in use",
                    });
                }
            }

            return ctx.db.user.update({
                where: { id: ctx.session.user.id },
                data: input,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            });
        }),

    changePassword: protectedProcedure
        .input(z.object({
            currentPassword: z.string(),
            newPassword: z.string().min(8),
        }))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { id: ctx.session.user.id },
            });

            if (!user || !user.password) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User has no password set (OAuth user?)",
                });
            }

            const isValid = await bcrypt.compare(input.currentPassword, user.password);
            if (!isValid) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Incorrect current password",
                });
            }

            const hashedPassword = await bcrypt.hash(input.newPassword, 10);

            await ctx.db.user.update({
                where: { id: ctx.session.user.id },
                data: { password: hashedPassword },
            });

            return { success: true };
        }),
});
