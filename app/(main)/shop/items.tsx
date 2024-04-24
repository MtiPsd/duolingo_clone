"use client";

import { refillHearts } from "@/actions/user_progress";
import { createStripeUrl } from "@/actions/user_subscription";
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export function Items({
  hasActiveSubscription,
  hearts,
  points,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onRefillHearts() {
    if (isPending || hearts === 5 || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts().catch(() => toast.error("Something went wrong"));
    });
  }

  function onUpgrade() {
    startTransition(() => {
      createStripeUrl()
        .then(res => {
          if (res.data) {
            window.location.href = res.data;
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/heart.svg" alt="Heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>

        <Button
          onClick={onRefillHearts}
          disabled={
            isPending || hearts === 5 || points < POINTS_TO_REFILL
          }
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image
                src="/points.svg"
                alt="Points"
                height={20}
                width={20}
              />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>

      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image
          src="/unlimited.svg"
          alt="Unlimited"
          height={60}
          width={60}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Unlimited hearts
          </p>
        </div>

        {/* TODO: Add subscription feature later */}
        <Button
          disabled={true || isPending || hasActiveSubscription}
          onClick={onUpgrade}
        >
          {/* {hasActiveSubscription ? "active" : "upgrade"} */}
          coming soon ..
        </Button>
      </div>
    </ul>
  );
}
