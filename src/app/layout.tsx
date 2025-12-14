import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME ?? "T3 App Auth Starter",
    description: "Authentication starter with T3 Stack",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
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
                    <Providers>
                        <Toaster />
                        {children}
                    </Providers>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
