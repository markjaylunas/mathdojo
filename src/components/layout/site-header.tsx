import { MobileNav } from "@components/layout/mobile-nav";
import { MainNav } from "@components/layout/main-nav";
import AuthNav from "@components/layout/auth-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex w-full  justify-between  h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <AuthNav />
      </div>
    </header>
  );
}
