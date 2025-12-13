import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DashboardContent } from "@/components/dashboard-content";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
            <DashboardContent />
        </div>
    );
}
