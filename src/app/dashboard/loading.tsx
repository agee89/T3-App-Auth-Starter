import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
    return (
        <div className="container mx-auto p-8">
            <Skeleton className="mb-8 h-10 w-48" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="space-y-2 pt-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>
        </div>
    );
}
