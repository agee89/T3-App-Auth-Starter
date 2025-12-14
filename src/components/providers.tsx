"use client";

import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ProgressBar
                height="3px"
                color="#000000"
                options={{ showSpinner: false }}
                shallowRouting
            />
            {children}
        </SessionProvider>
    );
}
