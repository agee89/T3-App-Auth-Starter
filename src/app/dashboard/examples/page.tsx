"use client";

import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ExamplesPage() {
    const [loading, setLoading] = useState(true);

    // Simulate loading data
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Component Examples</h2>
                <p className="text-muted-foreground">
                    Demonstrating installed libraries: react-loading-skeleton, framer-motion, and next-nprogress-bar.
                </p>
            </div>

            {/* Skeleton Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="font-semibold mb-2">React Loading Skeleton</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Refreshes to see the loading state (3s).
                    </p>
                    <div className="space-y-4">
                        <div>
                            {loading ? <Skeleton width={150} /> : <h4 className="font-medium">User Profile</h4>}
                        </div>
                        <div className="flex items-center space-x-4">
                            {loading ? (
                                <Skeleton circle width={50} height={50} />
                            ) : (
                                <div className="h-12 w-12 rounded-full bg-slate-200" />
                            )}
                            <div className="space-y-2 flex-1">
                                {loading ? <Skeleton count={2} /> : (
                                    <>
                                        <p className="text-sm">Abdul Gafur</p>
                                        <p className="text-xs text-muted-foreground">Software Engineer</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Framer Motion Section */}
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6 overflow-hidden">
                    <h3 className="font-semibold mb-2">Framer Motion</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Simple animation examples.
                    </p>
                    <div className="flex flex-col items-center gap-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                            className="h-16 w-16 bg-blue-500 rounded-lg shadow-lg"
                        />
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md"
                        >
                            Hover & Click Me
                        </motion.button>
                    </div>
                </div>

                {/* NProgress Section */}
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="font-semibold mb-2">Next NProgress Bar</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Click links to see the progress bar at the top (if navigation takes time/fetches).
                    </p>
                    <div className="flex flex-col gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/settings">Go to Settings (404)</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
