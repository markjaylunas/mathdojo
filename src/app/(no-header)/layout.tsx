import { SiteFooter } from "@/src/components/layout/site-footer";
import Heading from "@/src/components/ui/heading";
import { Icons } from "@/src/components/ui/icons";
import { siteConfig } from "@/src/lib/config";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <div className=" mx-auto max-w-3xl flex-col space-y-8 border-0 sm:border-x">
          <div className="flex items-center justify-center">
            <Icons.logo className="mr-2 size-24" />
            <Heading order="6xl" className="font-bold">
              {siteConfig.name}
            </Heading>
          </div>
          <div className=" min-h-screen px-8">{children}</div>
        </div>
        <SiteFooter />
      </main>
    </div>
  );
};

export default layout;
