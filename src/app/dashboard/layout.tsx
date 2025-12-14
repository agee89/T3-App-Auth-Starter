import { Sidebar } from "@/components/dashboard/sidebar";
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
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar - Desktop */}
            <div className="hidden md:block w-64 border-r">
                <Sidebar className="h-full border-r-0" />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[60px]">
                    <div className="flex-1">
                        {/* Mobile trigger can go here */}
                        <h1 className="font-semibold text-lg md:hidden">T3 App</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <UserNav />
                    </div>
                </header>
                <main className="flex-1 p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
