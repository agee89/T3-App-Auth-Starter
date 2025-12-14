import { SignInForm } from "@/components/auth/signin-form";

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <SignInForm
                enableGoogle={process.env.ENABLE_GOOGLE_AUTH !== "false"}
                enableEmail={process.env.ENABLE_EMAIL_AUTH !== "false"}
            />
        </div>
    );
}
