import { FeedWrapper } from "@/components/feed_wrapper";
import { StickyWrapper } from "@/components/sticky_wrapper";
import { Header } from "./header";

function LearnPage() {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>My Sticky Sidebar</StickyWrapper>
      <FeedWrapper>
        <Header title="Spanish" />
      </FeedWrapper>
    </div>
  );
}

export default LearnPage;
