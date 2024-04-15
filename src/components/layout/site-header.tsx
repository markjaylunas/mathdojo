import { MainNav } from "@components/layout/main-nav";
import AuthNav from "@components/layout/auth-nav";

export async function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14  w-full  max-w-screen-2xl items-center justify-between">
        <MainNav />
        <AuthNav />
      </div>
    </header>
  );
}
