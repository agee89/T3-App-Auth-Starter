
import { z } from "zod";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail } from "@/lib/email-sender";
import { randomBytes } from "crypto";

export const authRouter = createTRPCRouter({
    register: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string().min(8),
            name: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            const exists = await ctx.db.user.findUnique({
                where: { email: input.email },
            });

            if (exists) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "User already exists",
                });
            }

            const hashedPassword = await bcrypt.hash(input.password, parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"));

            const user = await ctx.db.user.create({
                data: {
                    email: input.email,
                    password: hashedPassword,
                    name: input.name,
                },
            });

            // Generate verification token
            const token = randomBytes(32).toString("hex");
            await ctx.db.verificationToken.create({
                data: {
                    identifier: user.email,
                    token,
                    expires: new Date(Date.now() + (parseInt(process.env.EMAIL_VERIFICATION_EXPIRY || "86400") * 1000)), // Default 24 hours
                    userId: user.id
                },
            });

            try {
                await sendVerificationEmail(user.email, token);
            } catch (error) {
                console.error("Failed to send verification email:", error);
                // Don't throw error to user, they can resend later
            }

            return { success: true };
        }),

    verifyEmail: publicProcedure
        .input(z.object({
            token: z.string(),
            email: z.string().email().optional()
        }))
        .mutation(async ({ ctx, input }) => {
            const verificationToken = await ctx.db.verificationToken.findUnique({
                where: { token: input.token },
            });

            if (!verificationToken) {
                // If token invalid, check if user is already verified using the optional email param
                if (input.email) {
                    const user = await ctx.db.user.findUnique({
                        where: { email: input.email },
                    });

                    if (user && user.emailVerified) {
                        return { success: true, message: "Already verified" };
                    }
                }

                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Invalid token",
                });
            }

            if (verificationToken.expires < new Date()) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Token expired",
                });
            }

            const updatedUser = await ctx.db.user.update({
                where: { id: verificationToken.userId },
                data: { emailVerified: new Date() },
            });

            try {
                await sendWelcomeEmail(updatedUser.email, updatedUser.name);
            } catch (error) {
                console.error("Failed to send welcome email:", error);
            }

            try {
                await ctx.db.verificationToken.delete({
                    where: { identifier_token: { identifier: verificationToken.identifier, token: input.token } },
                });
            } catch (error) {
                // Ignore if already deleted (race condition)
                console.error("Failed to delete verification token (might be already deleted):", error);
            }

            // Generate auto-login token
            // We reuse the JWT secret from next-auth
            const token = Buffer.from(JSON.stringify({
                userId: verificationToken.userId,
                expiredAt: Date.now() + (parseInt(process.env.AUTO_LOGIN_EXPIRY || "120") * 1000) // Default 2 minutes
            })).toString('base64');

            return { success: true, message: "Email verified", token };
        }),

    forgotPassword: publicProcedure
        .input(z.object({ email: z.string().email() }))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { email: input.email },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            if (!user.emailVerified) {
                const token = randomBytes(32).toString("hex");
                await ctx.db.verificationToken.create({
                    data: {
                        identifier: user.email,
                        token,
                        expires: new Date(Date.now() + (parseInt(process.env.EMAIL_VERIFICATION_EXPIRY || "86400") * 1000)), // Default 24 hours
                        userId: user.id
                    },
                });

                try {
                    await sendVerificationEmail(user.email, token);
                } catch (error) {
                    console.error("Failed to send verification email:", error);
                }

                return { success: true };
            }

            const token = randomBytes(32).toString("hex");
            const expires = new Date(Date.now() + (parseInt(process.env.PASSWORD_RESET_EXPIRY || "3600") * 1000)); // Default 1 hour

            await ctx.db.passwordResetToken.create({
                data: {
                    email: user.email,
                    token,
                    expires,
                    userId: user.id
                },
            });

            try {
                await sendPasswordResetEmail(user.email, token);
            } catch (error) {
                console.error("Failed to send reset email:", error);
            }

            return { success: true };
        }),

    resetPassword: publicProcedure
        .input(z.object({
            token: z.string(),
            password: z.string().min(8),
        }))
        .mutation(async ({ ctx, input }) => {
            const resetToken = await ctx.db.passwordResetToken.findUnique({
                where: { token: input.token },
            });

            if (!resetToken) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Invalid token",
                });
            }

            if (resetToken.expires < new Date()) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Token expired",
                });
            }

            const hashedPassword = await bcrypt.hash(input.password, parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"));

            await ctx.db.user.update({
                where: { id: resetToken.userId },
                data: { password: hashedPassword },
            });

            await ctx.db.passwordResetToken.delete({
                where: { email_token: { email: resetToken.email, token: input.token } },
            });

            return { success: true };
        }),
});
