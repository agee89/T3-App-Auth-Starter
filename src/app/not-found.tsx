import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground gap-4">
            <div className="rounded-full bg-muted p-4">
                <Ghost className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">404</h1>
            <h2 className="text-xl font-semibold">Page Not Found</h2>
            <p className="text-center text-muted-foreground max-w-sm">
                Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            <div className="mt-4 flex gap-2">
                <Button asChild variant="default">
                    <Link href="/">
                        Go Home
                    </Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/dashboard">
                        Go to Dashboard
                    </Link>
                </Button>
            </div>
        </div>
    );
}
