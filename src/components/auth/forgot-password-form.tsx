"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Mail } from "lucide-react";
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
    email: z.string().email(),
});

export function ForgotPasswordForm() {
    const { toast } = useToast();
    const [success, setSuccess] = useState(false);

    const mutation = api.auth.forgotPassword.useMutation({
        onSuccess: () => {
            setSuccess(true);
            toast({
                title: "Email sent",
                description: "If an account exists, we sent a password reset link.",
            });
        },
        onError: (error) => {
            // For security, don't reveal if user exists, but here we just show error during dev
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong.",
            });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate({ email: values.email });
    }

    const isLoading = mutation.isPending;

    if (success) {
        return (
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Check your email</CardTitle>
                    <CardDescription>We have sent a password reset link to your email address.</CardDescription>
                </CardHeader>
                <CardFooter className="justify-center">
                    <Link href="/auth/signin">
                        <Button variant="outline">Back to Sign In</Button>
                    </Link>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>Enter your email to receive a password reset link</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input placeholder="name@example.com" className="pl-9" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Send Reset Link
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Link href="/auth/signin" className="text-sm text-muted-foreground hover:text-primary hover:underline">
                    Back to Sign In
                </Link>
            </CardFooter>
        </Card>
    );
}
