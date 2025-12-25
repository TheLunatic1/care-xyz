import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Register - Care.xyz",
  description: "Create an account to book trusted care for your loved ones",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <Suspense fallback={<LoadingFallback />}>
        <RegisterForm />
      </Suspense>
    </main>
  );
}

function LoadingFallback() {
  return (
    <div className="text-center">
      <p className="text-xl text-muted-foreground">Loading registration form...</p>
      <p className="text-muted-foreground mt-4">We care about your time ♥</p>
    </div>
  );
}