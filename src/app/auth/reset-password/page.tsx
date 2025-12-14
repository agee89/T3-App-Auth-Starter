import { ResetPasswordForm } from "@/components/auth/reset-password-form";

import { Suspense } from "react";

export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}
