import { FeedWrapper } from "@/components/feed_wrapper";
import { StickyWrapper } from "@/components/sticky_wrapper";
import UserProgress from "@/components/user_progress";
import { Header } from "./header";

function LearnPage() {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "Spanish", imageSrc: "/es.svg" }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Spanish" />
      </FeedWrapper>
    </div>
  );
}

export default LearnPage;
