import { SiteFooter } from "@/src/components/layout/site-footer";
import { SiteHeader } from "@/src/components/layout/site-header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className=" mx-auto max-w-3xl flex-col border-0 sm:border-x">
          <div className=" min-h-screen px-4 py-4">{children}</div>
        </div>
        <SiteFooter />
      </main>
    </div>
  );
};

export default layout;
