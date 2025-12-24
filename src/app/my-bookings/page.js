"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading...</p>
      </main>
    );
  }

  if (!session) return null;

  // Placeholder bookings data
  const bookings = [
    {
      id: "1",
      service: "Baby Care",
      duration: "8 hours",
      location: "Mirpur, Dhaka",
      cost: "৳4,000",
      status: "Confirmed",
    },
    {
      id: "2",
      service: "Elderly Service",
      duration: "3 days",
      location: "Gulshan, Dhaka",
      cost: "৳43,200",
      status: "Pending",
    },
    {
      id: "3",
      service: "Special Care for Sick People",
      duration: "5 hours",
      location: "Uttara, Dhaka",
      cost: "৳4,000",
      status: "Completed",
    },
    {
      id: "4",
      service: "Baby Care",
      duration: "1 day",
      location: "Dhanmondi, Dhaka",
      cost: "৳12,000",
      status: "Cancelled",
    },
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "Confirmed":
        return "default";
      case "Pending":
        return "secondary";
      case "Completed":
        return "outline";
      case "Cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <main className="min-h-screen bg-background py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary text-center mb-12">
          My Bookings
        </h1>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Welcome back, {session.user?.name || session.user?.email}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Your recent bookings with Care.xyz</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.service}</TableCell>
                    <TableCell>{booking.duration}</TableCell>
                    <TableCell>{booking.location}</TableCell>
                    <TableCell className="font-semibold">{booking.cost}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {booking.status === "Pending" && (
                        <Button variant="destructive" size="sm">
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {bookings.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No bookings yet. Start by booking a service!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}