"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Package, Settings } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();

    const routes = [
        {
            label: "Overview",
            icon: LayoutDashboard,
            href: "/dashboard",
            active: pathname === "/dashboard",
        },
        {
            label: "Customers",
            icon: Users,
            href: "/dashboard/",
            active: pathname === "/dashboard/",
        },
        {
            label: "Products",
            icon: Package,
            href: "/dashboard/",
            active: pathname === "/dashboard/",
        },
        {
            label: "Examples",
            icon: Package,
            href: "/dashboard/examples",
            active: pathname === "/dashboard/examples",
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/dashboard/settings",
            active: pathname === "/dashboard/settings",
        },
    ];

    return (
        <div className={cn("pb-12 h-screen border-r bg-background", className)}>
            <div className="space-y-4 py-4 h-full flex flex-col">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        {process.env.NEXT_PUBLIC_APP_NAME ?? "T3 App"}
                    </h2>
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.active ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                asChild
                            >
                                <Link href={route.href}>
                                    <route.icon className="mr-2 h-4 w-4" />
                                    {route.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
