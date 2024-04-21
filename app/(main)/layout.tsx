import { MobileHeader } from "@/components/mobile_header";
import { ExitModal } from "@/components/modals/exit_modal";
import { Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="h-full mx-auto pt-6 max-w-[1056px]">
          <Toaster />
          <ExitModal />
          {children}
        </div>
      </main>
    </>
  );
}

export default MainLayout;
