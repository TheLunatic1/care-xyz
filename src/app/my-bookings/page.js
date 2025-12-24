"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchBookings();
    }
  }, [status]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (res.ok) {
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!cancelId) return;

    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: cancelId }),
      });

      if (res.ok) {
        fetchBookings();
        setCancelId(null);
      } else {
        alert("Failed to cancel booking");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading bookings...</p>
      </main>
    );
  }

  if (!session) return null;

  const getStatusVariant = (status) => {
    switch (status) {
      case "Confirmed": return "default";
      case "Pending": return "secondary";
      case "Completed": return "outline";
      case "Cancelled": return "destructive";
      default: return "secondary";
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
            {bookings.length === 0 ? (
              <p className="text-center text-lg text-muted-foreground py-8">
                No bookings yet. Start by booking a service! ♥
              </p>
            ) : (
              <Table>
                <TableCaption>Your bookings with Care.xyz</TableCaption>
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
                    <TableRow key={booking._id}>
                      <TableCell className="font-medium">{booking.serviceName}</TableCell>
                      <TableCell>{booking.durationAmount} {booking.durationType}</TableCell>
                      <TableCell>{booking.area}, {booking.city}</TableCell>
                      <TableCell className="font-semibold">৳{booking.totalCost.toLocaleString("en-BD")}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {/* View Details */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle className="text-2xl text-primary">
                                {selectedBooking?.serviceName} Booking Details
                              </DialogTitle>
                              <DialogDescription>
                                Booked on {selectedBooking && new Date(selectedBooking.createdAt).toLocaleDateString("en-BD")}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <p className="font-medium">Duration</p>
                                <p>{selectedBooking?.durationAmount} {selectedBooking?.durationType}</p>
                              </div>
                              <div>
                                <p className="font-medium">Location</p>
                                <p>
                                  {selectedBooking?.area}, {selectedBooking?.city},<br />
                                  {selectedBooking?.district}, {selectedBooking?.division}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Full Address</p>
                                <p>{selectedBooking?.address}</p>
                              </div>
                              <div>
                                <p className="font-medium">Total Cost</p>
                                <p className="text-2xl font-bold text-primary">
                                  ৳{selectedBooking?.totalCost.toLocaleString("en-BD")}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Status</p>
                                <Badge variant={getStatusVariant(selectedBooking?.status)}>
                                  {selectedBooking?.status}
                                </Badge>
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Close</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Cancel Modal */}
                        {booking.status === "Pending" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => setCancelId(booking._id)}
                              >
                                Cancel
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Cancel Booking?</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to cancel your {booking.serviceName} booking?
                                  This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                  <Button variant="outline">
                                    No, keep it
                                  </Button>
                                </DialogClose>
                                <Button variant="destructive" onClick={handleCancel}>
                                  Yes, cancel booking
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}