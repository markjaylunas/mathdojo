import { SiteFooter } from "@/src/components/layout/site-footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className=" mx-auto max-w-3xl flex-col border-0 sm:border-x">
        <div className=" min-h-screen px-8">{children}</div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default layout;
