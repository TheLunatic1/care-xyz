import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(request) {
  try {
    await dbConnect();

    // Get session server-side
    const session = await getServerSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Booking API ready!",
        user: {
          name: session.user?.name,
          email: session.user?.email,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}