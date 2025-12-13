import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "T3 App Auth Starter",
    description: "Authentication starter with T3 Stack",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`font-sans ${inter.variable}`}>
                <TRPCReactProvider>
                    {/* Top progress bar */}
                    <ProgressBar
                        height="3px"
                        color="#000000"
                        options={{ showSpinner: false }}
                        shallowRouting
                    />
                    <Toaster />
                    {children}
                </TRPCReactProvider>
            </body>
        </html>
    );
}
