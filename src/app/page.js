import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-primary text-center mb-12">
          Welcome to Care.xyz
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Reliable Care for Your Loved Ones</CardTitle>
            <CardDescription>
              Trusted babysitting, elderly care, and special needs services
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button size="lg">Explore Services</Button>
          </CardContent>
        </Card>

        <p className="text-center text-muted-foreground">
          Soft pastel colors, rounded card, sky blue button — our caring theme is ready!
        </p>
      </div>
    </main>
  );
}