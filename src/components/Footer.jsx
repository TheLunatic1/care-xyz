import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function Footer() {
  return (
    <footer className="bg-primary/5 border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand & Message */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-primary">Care.xyz</span>
            </Link>
            <p className="text-foreground/80 max-w-md">
              Reliable, trusted, and compassionate care for your babies, elderly, and loved ones — making caregiving easy, secure, and full of warmth.
            </p>
            <p className="text-lg font-medium text-primary mt-4">
              Family First. Always. ♥
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-foreground/80 hover:text-primary transition">Home</Link></li>
              <li><Link href="/my-bookings" className="text-foreground/80 hover:text-primary transition">My Bookings</Link></li>
              <li><Link href="/login" className="text-foreground/80 hover:text-primary transition">Sign In</Link></li>
              <li><Link href="/register" className="text-foreground/80 hover:text-primary transition">Register</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Get in Touch</h3>
            <p className="text-foreground/80">
              Email: <a href="mailto:support@care.xyz" className="hover:text-primary transition">support@care.xyz</a><br />
              Phone: <span className="text-foreground/80">+880 1700 000 000</span>
            </p>
            <p className="text-sm text-muted-foreground mt-6">
              We’re here to help your family with love and care.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary/10 mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Care.xyz — Trusted Baby Sitting & Elderly Care Service. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}