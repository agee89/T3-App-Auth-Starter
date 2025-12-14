"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    const router = useRouter();
    const verifyMutation = api.auth.verifyEmail.useMutation({
        onSuccess: async (data) => {
            if (data.token) {
                setMessage("Logging you in...");
                await signIn("token-login", {
                    token: data.token,
                    callbackUrl: "/dashboard",
                    redirect: true,
                });
                return;
            }

            setStatus("success");
            if (data.message === "Already verified") {
                setMessage("Email already verified");
            } else {
                setMessage("Your email has been successfully verified.");
            }
        },
        onError: (error) => {
            setStatus("error");
            setMessage(error.message);
        },
    });

    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;

        if (token) {
            initialized.current = true;
            verifyMutation.mutate({ token, email: email || undefined });
        } else {
            console.error("Missing token");
            // Only set error if we haven't tried verifying yet
            if (status === "loading") {
                setStatus("error");
                setMessage("Missing token");
            }
        }
        // Run once on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Email Verification</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 py-8">
                {status === "loading" && (
                    <>
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <p>Verifying your email...</p>
                    </>
                )}
                {status === "success" && (
                    <>
                        <CheckCircle className="h-10 w-10 text-green-500" />
                        <p className="text-center">{message}</p>
                    </>
                )}
                {status === "error" && (
                    <>
                        <XCircle className="h-10 w-10 text-destructive" />
                        <p className="text-center text-destructive">Verification failed: {message}</p>
                    </>
                )}
            </CardContent>
            <CardFooter className="justify-center">
                {status === "success" && (
                    <Link href="/dashboard">
                        <Button>Go to Dashboard</Button>
                    </Link>
                )}
                {status === "error" && (
                    <Link href="/auth/signin">
                        <Button variant="outline">Back to Sign In</Button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyEmailContent />
            </Suspense>
        </div>
    );
}
