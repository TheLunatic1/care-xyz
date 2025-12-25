import * as React from "react";

export default function BookingInvoice({ booking, userName }) {
  const {
    serviceName,
    durationAmount,
    durationType,
    division,
    district,
    city,
    area,
    address,
    totalCost,
    createdAt,
  } = booking;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9fafb", padding: "40px 20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
        {/* Header */}
        <div style={{ backgroundColor: "#3b82f6", padding: "30px", textAlign: "center", color: "white" }}>
          <h1 style={{ margin: 0, fontSize: "28px" }}>Care.xyz</h1>
          <p style={{ margin: "8px 0 0", fontSize: "18px", opacity: 0.9 }}>
            Your Booking Confirmation ♥
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "40px 30px" }}>
          <p style={{ fontSize: "18px", color: "#374151" }}>
            Dear <strong>{userName}</strong>,
          </p>
          <p style={{ fontSize: "16px", color: "#4b5563", lineHeight: "1.6" }}>
            Thank you for choosing Care.xyz! We&apos;re happy to confirm your booking for compassionate care. Your loved ones are in safe hands.
          </p>

          <div style={{ backgroundColor: "#f0f9ff", padding: "24px", borderRadius: "12px", margin: "24px 0", border: "1px solid #bae6fd" }}>
            <h2 style={{ color: "#0369a1", marginTop: 0 }}>Booking Details</h2>
            <table style={{ width: "100%", fontSize: "16px", color: "#374151" }}>
              <tbody>
                <tr><td style={{ padding: "8px 0" }}><strong>Service:</strong></td><td>{serviceName}</td></tr>
                <tr><td style={{ padding: "8px 0" }}><strong>Duration:</strong></td><td>{durationAmount} {durationType}</td></tr>
                <tr><td style={{ padding: "8px 0" }}><strong>Location:</strong></td><td>{area}, {city}, {district}, {division}</td></tr>
                <tr><td style={{ padding: "8px 0" }}><strong>Full Address:</strong></td><td>{address}</td></tr>
                <tr><td style={{ padding: "8px 0" }}><strong>Booked on:</strong></td><td>{formattedDate}</td></tr>
                <tr><td style={{ padding: "12px 0", fontSize: "20px", color: "#dc2626" }}><strong>Total Cost:</strong></td><td style={{ fontSize: "20px", fontWeight: "bold", color: "#dc2626" }}>৳{totalCost.toLocaleString("en-BD")}</td></tr>
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: "16px", color: "#4b5563", lineHeight: "1.6" }}>
            We&apos;ll match you with a trusted caregiver soon. You can track your booking status anytime in your dashboard.
          </p>

          <p style={{ fontSize: "16px", color: "#4b5563" }}>
            Need help? Contact us at <a href="mailto:support@care.xyz" style={{ color: "#3b82f6" }}>support@care.xyz</a>
          </p>

          <p style={{ fontSize: "16px", color: "#374151", marginTop: "32px" }}>
            With warmth and care,<br />
            <strong>The Care.xyz Team</strong> ♥
          </p>
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: "#f3f4f6", padding: "20px", textAlign: "center", fontSize: "14px", color: "#6b7280" }}>
          <p style={{ margin: 0 }}>© 2025 Care.xyz - Trusted Care for Your Loved Ones</p>
        </div>
      </div>
    </div>
  );
}