"use client";

import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { toast } from "sonner";
import { useState } from "react";
import { createCheckoutSession } from "./action";
import { env } from "@/env";

const monthlyFeatures = ["RM12.90", "Full customization","Unlimited"];
const yearlyFeatures = ["RM79.00 (save ~50%)", "Full customization", "Unlimited"];

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();

  const [loading, setloading] = useState(false);

  async function HandlePremiumClick(priceId: string) {
    try {
      setloading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setloading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Resume Builder Premium</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Get a premium subscription to unlock more features.</p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Monthly Plan</h3>
              <ul className="list-inside space-y-2">
                {monthlyFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
              variant="default"
                onClick={() =>
                  HandlePremiumClick(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY!,
                  )
                }
                disabled={loading}
              >
                Get Monthly
              </Button>
            </div>
            <div className="border-1 mx-6" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold text-red-600">
                Yearly Plan
              </h3>
              <ul className="list-inside space-y-2">
                {yearlyFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="destructive"
                onClick={() =>
                  HandlePremiumClick(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY!,
                  )
                }
                disabled={loading}
              >
                Get Yearly
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
