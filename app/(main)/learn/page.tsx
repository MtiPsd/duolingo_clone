import { FeedWrapper } from "@/components/feed_wrapper";
import { StickyWrapper } from "@/components/sticky_wrapper";

function LearnPage() {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>My Sticky Sidebar</StickyWrapper>
      <FeedWrapper>My Wrapper</FeedWrapper>
    </div>
  );
}

export default LearnPage;
