
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <div className="flex min-h-screen flex-col">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <div className="mr-4 hidden md:flex font-bold">
                        T3 App
                    </div>
                    <MainNav className="mx-6" />
                    <div className="ml-auto flex items-center space-x-4">
                        <UserNav />
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                {children}
            </div>
        </div>
    );
}
