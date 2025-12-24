import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full shadow-xl text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-primary">
            Oops! Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-foreground/80">
            We couldn&apos;t find the page you&apos;re looking for.
          </p>
          <p className="text-muted-foreground">
            Don&apos;t worry — let&apos;s get you back home safely ♥
          </p>
          <Button size="lg" asChild className="text-lg py-6">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}