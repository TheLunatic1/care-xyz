"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BookServiceButton({ serviceId }) {
  const { status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (status === "authenticated") {
      router.push(`/booking/${serviceId}`);
    } else {
      router.push(`/login?callbackUrl=/booking/${serviceId}`);
    }
  };

  return (
    <Button
      size="lg"
      className="text-lg px-10 py-6"
      onClick={handleClick}
    >
      Book This Service
    </Button>
  );
}