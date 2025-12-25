"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [nid, setNid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    // Client-side password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setMessage(
        "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter"
      );
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nid,
          name,
          email: email.toLowerCase(),
          contact,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registration successful! ♥ Redirecting to login...");
        setMessageType("success");

        // Redirect to login with callbackUrl so they go straight to booking after login
        setTimeout(() => {
          router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        }, 2000);
      } else {
        setMessage(data.error || "Registration failed");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Join Care.xyz
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Create an account to book trusted care for your loved ones
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="nid">NID No</Label>
              <Input
                id="nid"
                type="text"
                placeholder="1234567890"
                value={nid}
                onChange={(e) => setNid(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1"
              />
            </div>

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
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                type="tel"
                placeholder="01700000000"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
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
              <p className="text-sm text-muted-foreground mt-2">
                Must be 6+ characters with at least 1 uppercase & 1 lowercase letter
              </p>
            </div>

            {message && (
              <p
                className={`text-center font-medium ${
                  messageType === "success" ? "text-green-600" : "text-destructive"
                }`}
              >
                {message}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full text-lg py-6"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-primary hover:underline">
              Sign in here
            </a>
          </p>

          <p className="text-center text-sm text-muted-foreground">
            We care about your family&apos;s privacy and safety ♥
          </p>
        </CardContent>
      </Card>
    </main>
  );
}