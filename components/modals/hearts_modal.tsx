"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHeartsModal } from "@/store/use_hearts_modal";

export function HeartsModal() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { close, isOpen } = useHeartsModal();

  useEffect(() => {
    setIsClient(true);
  }, [isOpen]);

  if (!isClient) {
    return null;
  }

  function onClick() {
    close();
    router.push("/store");
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src="/mascot_bad.svg"
              alt="Mascot"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            You ran out of hearts!
          </DialogTitle>

          <DialogDescription className="text-center text-base">
            Get pro for unlimited hearts, or purchase them in the
            store.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              size="lg"
              variant="primary"
              className="w-full"
              onClick={onClick}
            >
              Get unlimited hearts
            </Button>

            <Button
              size="lg"
              variant="primaryOutline"
              className="w-full"
              onClick={close}
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}