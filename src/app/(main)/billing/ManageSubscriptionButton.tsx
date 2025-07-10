"use client";

import LoadingButton from "@/components/LoadingButton";
import { toast } from "sonner"; // ✅ Use Sonner directly
import { useState } from "react";
import { createCustomerPortalSession } from "./action";

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const redirectUrl = await createCustomerPortalSession();
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again."); // ✅ Sonner style
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton onClick={handleClick} loading={loading}>
      Manage subscription
    </LoadingButton>
  );
}
