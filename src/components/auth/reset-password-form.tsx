"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Lock } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

const formSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();
    const { toast } = useToast();

    const mutation = api.auth.resetPassword.useMutation({
        onSuccess: () => {
            toast({
                title: "Password reset",
                description: "Your password has been successfully reset. You can now login.",
            });
            router.push("/auth/signin");
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!token) return;
        mutation.mutate({
            token,
            password: values.password,
        });
    }

    if (!token) {
        return (
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-destructive">Invalid Link</CardTitle>
                    <CardDescription>Missing reset token.</CardDescription>
                </CardHeader>
                <CardFooter className="justify-center">
                    <Link href="/auth/forgot-password">
                        <Button variant="outline">Request new link</Button>
                    </Link>
                </CardFooter>
            </Card>
        );
    }

    const isLoading = mutation.isPending;

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>Enter your new password</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input type="password" className="pl-9" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input type="password" className="pl-9" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
