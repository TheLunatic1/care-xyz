import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default async function BookingPage({ params }) {
  const resolvedParams = await params;
  const serviceId = resolvedParams.service_id || "";

  // service name mapping
  let serviceName = "Unknown Service";
  if (serviceId === "baby-care") serviceName = "Baby Care";
  if (serviceId === "elderly-service") serviceName = "Elderly Service";
  if (serviceId === "sick-people") serviceName = "Special Care for Sick People";

  return (
    <main className="min-h-screen bg-background py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-primary text-center">
              Book {serviceName}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-8">
            <p className="text-center text-lg text-foreground/80">
              You are booking: <span className="font-semibold text-primary">{serviceName}</span>
            </p>

            {/* Duration Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Select Duration</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="e.g. 5" min="1" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger id="type" className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <p className="text-center text-muted-foreground">
              Next: Location selection and dynamic cost calculation.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}