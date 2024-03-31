import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  activeCourse: { imageSrc: string; title: string }; //TODO: Replace with database types
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

function UserProgress({
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
    </div>
  );
}

export default UserProgress;
