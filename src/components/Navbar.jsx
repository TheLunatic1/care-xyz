"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Care.xyz</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-foreground/80 hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}

          {status === "authenticated" && (
            <Link href="/my-bookings" className="text-foreground/80 hover:text-primary transition-colors">
              My Bookings
            </Link>
          )}
        </nav>

        {/* Right side - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {status === "loading" && <div className="text-sm">Loading...</div>}

          {status === "unauthenticated" && (
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}

          {status === "authenticated" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {session.user?.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{session.user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/my-bookings">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col space-y-6 mt-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-lg text-foreground/80 hover:text-primary">
                  {link.name}
                </Link>
              ))}

              {status === "authenticated" && (
                <Link href="/my-bookings" className="text-lg text-foreground/80 hover:text-primary">
                  My Bookings
                </Link>
              )}

              <div className="pt-4 border-t">
                {status === "unauthenticated" && (
                  <div className="space-y-3">
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </div>
                )}

                {status === "authenticated" && (
                  <div className="space-y-4">
                    <div className="text-sm">
                      <p className="font-medium">{session.user?.name}</p>
                      <p className="text-muted-foreground">{session.user?.email}</p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => signOut({ callbackUrl: "/" })}>
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}