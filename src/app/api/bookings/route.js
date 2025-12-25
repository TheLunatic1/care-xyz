import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

import { Resend } from "resend";
import BookingInvoice from "@/components/emails/BookingInvoice";

// GET - Fetch bookings for the authenticated user
export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const bookings = await Booking.find({
      $or: [
        { userEmail: session.user.email },
        { userId: session.user.id || session.user.email }
      ]
    }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// POST - Create a new booking
export async function POST(request) {
  try {
    await dbConnect();

    const session = await getServerSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();

    const newBooking = new Booking({
      userId: session.user.id || session.user.email,
      userEmail: session.user.email,
      userName: session.user.name || "User",
      serviceId: body.serviceId,
      serviceName: body.serviceName,
      durationAmount: body.durationAmount,
      durationType: body.durationType,
      division: body.division,
      district: body.district,
      city: body.city,
      area: body.area,
      address: body.address,
      totalCost: body.totalCost,
    });

        await newBooking.save();

    // Send email invoice
    console.log("Attempting to send email..."); // This will show in terminal
    console.log("API Key exists:", !!process.env.RESEND_API_KEY); // Should be true
    console.log("From email:", process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL || "noreply@care.xyz");
    console.log("To email:", session.user.email);

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const savedBooking = await Booking.findById(newBooking._id).lean();

      const { data, error } = await resend.emails.send({
        from: "Care.xyz <onboarding@resend.dev>",
        to: session.user.email,
        subject: `Care.xyz Booking Confirmation - ${savedBooking.serviceName}`,
        react: <BookingInvoice 
          booking={savedBooking} 
          userName={session.user.name || "Valued Customer"} 
        />,
      });

      if (error) {
        console.error("Resend error response:", error);
      } else {
        console.log("Email sent successfully! Resend data:", data);
      }
    } catch (emailError) {
      console.error("Failed to send email - Caught error:", emailError);
      console.error("Error details:", emailError.message || emailError);
    }

    return new Response(JSON.stringify({ message: "Booking saved successfully!" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
// PATCH - Cancel a booking
export async function PATCH(request) {
  try {
    await dbConnect();

    const session = await getServerSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { bookingId } = await request.json();

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
    }

    // Only allow user to cancel their own booking
    if (booking.userEmail !== session.user.email) {
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
    }

    // Only allow cancel if Pending
    if (booking.status !== "Pending") {
      return new Response(JSON.stringify({ error: "Can only cancel Pending bookings" }), { status: 400 });
    }

    booking.status = "Cancelled";
    await booking.save();

    return new Response(JSON.stringify({ message: "Booking cancelled" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}