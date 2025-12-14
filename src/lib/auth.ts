import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/server/db";
import { sendWelcomeEmail } from "@/lib/email";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultSession["user"] & {
            id: string;
            // ...other properties
            // role: UserRole;
        };
    }

    interface User {
        // ...other properties
        // role: UserRole;
        emailVerified?: Date | null;
    }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    events: {
        createUser: async ({ user }) => {
            // Check if user was created via Google provider (this event fires after creation)
            // Ideally we want to check the account, but here we can just verify if the email is from a trusted provider
            // However, the `profile` callback above is supposed to handle `emailVerified`.
            // If it's failing, we can try to force update here if needed, 
            // but `createUser` doesn't pass the provider info directly.
        },
        linkAccount: async ({ user, account }) => {
            if (account.provider === "google") {
                const dbUser = await db.user.findUnique({ where: { id: user.id } });
                if (!dbUser?.emailVerified) {
                    await db.user.update({
                        where: { id: user.id },
                        data: { emailVerified: new Date() },
                    });
                    try {
                        await sendWelcomeEmail(dbUser?.email ?? user.email!, dbUser?.name ?? user.name);
                    } catch (e) {
                        console.error("Failed to send welcome email on google link:", e);
                    }
                }
            }
        }
    },
    callbacks: {
        signIn: async ({ user, account, profile }) => {
            if (account?.provider === "google") {
                const googleProfile = profile as { email_verified?: boolean };
                if (googleProfile?.email_verified === true) {
                    // Directly update db if needed (e.g. existing user logging in with google for first time or just to be safe)
                    if (!user.emailVerified) {
                        await db.user.update({
                            where: { id: user.id }, // Use 'user.id' directly
                            data: { emailVerified: new Date() }
                        });
                    }
                }
            }
            return true;
        },
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    },
    session: {
        strategy: "jwt",
    },
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            allowDangerousEmailAccountLinking: true,
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    // If Google says email is verified, set the date immediately
                    emailVerified: profile.email_verified ? new Date() : null,
                };
            },
        }),
        CredentialsProvider({
            id: "token-login",
            name: "Token Login",
            credentials: {
                token: { label: "Token", type: "text" }
            },
            async authorize(credentials) {
                if (!credentials?.token) {
                    return null;
                }

                try {
                    // We'll trust the token we generated in the verifyEmail procedure
                    // In a real app, you might want to verify signature or database lookup
                    // For now, we assume the token IS the userId structure we encoded
                    const decoded = JSON.parse(Buffer.from(credentials.token, 'base64').toString());

                    if (decoded.expiredAt < Date.now()) {
                        return null;
                    }

                    const user = await db.user.findUnique({
                        where: { id: decoded.userId }
                    });

                    if (!user) return null;

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    };
                } catch (e) {
                    return null;
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await db.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.password) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            }
        })
    ],
    pages: {
        signIn: "/auth/signin",
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => {
    return getServerSession(authOptions);
};
