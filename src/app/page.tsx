import Link from "next/link";
import { getServerAuthSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
    const session = await getServerAuthSession({ req: {} as any, res: {} as any }); // Mock implementation for now, or use getServerSession directly

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                    T3 <span className="text-[hsl(280,100%,70%)]">Auth</span> Starter
                </h1>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-2xl text-white">
                        {session && <span>Logged in as {session.user?.name || session.user?.email}</span>}
                    </p>

                    <div className="flex gap-4">
                        {session ? (
                            <Link href="/dashboard">
                                <Button variant="secondary" size="lg">Go to Dashboard</Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/auth/signin">
                                    <Button variant="secondary" size="lg">Sign In</Button>
                                </Link>
                                <Link href="/auth/signup">
                                    <Button variant="outline" size="lg" className="bg-transparent text-white hover:bg-white/10">Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
