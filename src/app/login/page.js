"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
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
          <div className="text-center">
            <Button 
              size="lg" 
              className="w-full text-lg py-6"
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            We care about your family's safety and privacy ♥
          </p>
        </CardContent>
      </Card>
    </main>
  );
}