import { SiteFooter } from "@/src/components/layout/site-footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className=" mx-auto flex max-w-3xl flex-col border-x">
        <div className="mt-4 flex min-h-screen px-8">{children}</div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default layout;
