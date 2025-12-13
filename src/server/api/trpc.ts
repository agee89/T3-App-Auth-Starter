import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";

import { getServerAuthSession } from "@/lib/auth";
import { db } from "@/server/db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

interface CreateContextOptions {
    headers: Headers;
}

/**
 * This utility function is usually not directly calling my the user.
 * It is used by the `createTRPCContext` below.
 */
export const createInnerTRPCContext = async (opts: CreateContextOptions) => {
    const session = await getServerAuthSession({
        req: opts.headers as any, // Mocking req/res for getServerSession as it extracts from headers in Next 13+ usually or we use a different approach
        res: {} as any,
    } as any).catch(() => null);

    // NOTE: getServerAuthSession above expects req/res from GetServerSidePropsContext (Next.js Pages Router)
    // But in App Router route handlers, we use `getServerSession(authOptions)`.
    // I will fix getServerAuthSession usage for App Router below.

    return {
        session,
        headers: opts.headers,
        db,
    };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
    // Need to adjust getting session for App Router environment
    // In App Router, we just call getServerSession(authOptions) directly without req/res often,
    // or pass headers if needed.

    // Re-importing to avoid circular, but practically we should use a separate file for authOptions if needed.
    // For now using the improved session retrieval for App Router:
    const { authOptions } = await import("@/lib/auth");
    const { getServerSession } = await import("next-auth");

    const session = await getServerSession(authOptions);

    return {
        db,
        session,
        headers: opts.headers,
    };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but the data is a validated input.
 */
export const publicProcedure = t.procedure;

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            // infers the `session` as non-nullable
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
});
