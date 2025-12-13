"use client";

import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardContent() {
    const { data: user, isLoading } = api.user.me.useQuery();

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">Name:</span> {user.name}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {user.email}
                    </div>
                    <div>
                        <span className="font-semibold">Status:</span> {user.emailVerified ? (
                            <span className="text-green-600">Verified</span>
                        ) : (
                            <span className="text-yellow-600">Unverified</span>
                        )}
                    </div>
                    <div>
                        <span className="font-semibold">Joined:</span> {user.createdAt.toLocaleDateString()}
                    </div>
                </CardContent>
            </Card>

            {/* Other dashboard widgets can go here */}
        </div>
    );
}

function DashboardSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </CardContent>
            </Card>
        </div>
    );
}
