"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push(callbackUrl);
    }
    setLoading(false);
  };

  return (
    <Card className="max-w-md w-full shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary">
          Welcome to Care.xyz
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          Sign in to book trusted care for your loved ones
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Google Button */}
        <Button 
          size="lg" 
          className="w-full text-lg py-6"
          onClick={() => signIn("google", { callbackUrl })}
        >
          Sign in with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@family.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button 
            type="submit" 
            size="lg" 
            className="w-full text-lg py-6"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Test account: <strong>test@care.xyz</strong> / <strong>password123</strong>
        </p>

        <p className="text-center text-sm text-muted-foreground">
          We care about your family&apos;s safety and privacy ♥
        </p>

        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            New to Care.xyz?{" "}
            <a href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-primary hover:underline font-medium">
              Create an account
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}