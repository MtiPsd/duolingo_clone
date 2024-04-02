import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

type Props = {
  activeCourse: { imageSrc: string; title: string }; //TODO: Replace with database types
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export function UserProgress({
  activeCourse,
  hasActiveSubscription,
  hearts,
  points,
}: Props) {
  return (
    <div className="flex items-center justify-between w-full gap-x-2">
      <Link href="/courses">
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="border rounded-md"
            width={32}
            height={32}
          />
        </Button>
      </Link>

      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.svg"
            alt="Points"
            className="mr-2"
            height={28}
            width={28}
          />
          {points}
        </Button>
      </Link>

      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/heart.svg"
            alt="Hearts"
            className="mr-2"
            height={22}
            width={22}
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
}
