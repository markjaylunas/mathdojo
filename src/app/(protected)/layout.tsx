import { SiteFooter } from "@/src/components/layout/site-footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" mx-auto flex max-w-3xl flex-col border-x">
      <div className="mt-4 flex min-h-screen p-8">{children}</div>
      <SiteFooter />
    </div>
  );
};

export default layout;
