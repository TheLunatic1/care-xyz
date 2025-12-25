import { Suspense } from "react";
import LoginForm from "./LoginForm"; // Relative path

export const metadata = {
  title: "Sign In - Care.xyz",
  description: "Sign in to book trusted care for your loved ones",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <Suspense fallback={<LoadingFallback />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}

// Simple loading fallback
function LoadingFallback() {
  return (
    <div className="text-center">
      <p className="text-xl text-muted-foreground">Loading sign in form...</p>
      <p className="text-muted-foreground mt-4">We care about your time ♥</p>
    </div>
  );
}