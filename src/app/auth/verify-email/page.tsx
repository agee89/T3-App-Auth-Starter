"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    const verifyMutation = api.auth.verifyEmail.useMutation({
        onSuccess: () => {
            setStatus("success");
        },
        onError: (error) => {
            setStatus("error");
            setMessage(error.message);
        },
    });

    useEffect(() => {
        if (token) {
            verifyMutation.mutate({ token });
        } else {
            setStatus("error");
            setMessage("Missing token");
        }
        // Run once on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
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
                            <p className="text-center">Your email has been successfully verified.</p>
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
                    {status !== "loading" && (
                        <Link href="/auth/signin">
                            <Button>Sign In</Button>
                        </Link>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
