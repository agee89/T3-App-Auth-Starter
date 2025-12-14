"use client";

import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <NextTopLoader
                color="#29d"
                height={4}
                showSpinner={true}
            />
            {children}
        </SessionProvider>
    );
}
