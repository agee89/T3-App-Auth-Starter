import { SignUpForm } from "@/components/auth/signup-form";

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <SignUpForm
                enableGoogle={process.env.ENABLE_GOOGLE_AUTH !== "false"}
                enableEmail={process.env.ENABLE_EMAIL_AUTH !== "false"}
            />
        </div>
    );
}
