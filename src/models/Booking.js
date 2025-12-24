import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  // Link to the logged-in user (from NextAuth session)
  userId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },

  // Service details
  serviceId: {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },

  // Duration
  durationAmount: {
    type: Number,
    required: true,
    min: 1,
  },
  durationType: {
    type: String,
    enum: ["hours", "days"],
    required: true,
  },

  // Location
  division: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  // Cost
  totalCost: {
    type: Number,
    required: true,
  },

  // Status
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },

  // Timestamp
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;


// Explanation:

// userId, userEmail, userName — links booking to the person who made it
// serviceId and serviceName — which service they booked
// Duration fields — amount and type (hours/days)
// Location — all fields required for accurate care
// totalCost — calculated from duration × rate
// status — defaults to "Pending" (as per assignment)
// createdAt — when the booking was made