import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Care.xyz - Trusted Baby Sitting & Elderly Care",
  description: "Reliable and compassionate care for your loved ones",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background scroll-smooth">
        <SessionWrapper>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}