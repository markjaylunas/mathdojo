import { MobileNav } from "@/components/layout/mobile-nav";
import { ModeToggle } from "@/components/theme/theme-toggler";
import { MainNav } from "@/components/layout/main-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex w-full  justify-between  h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <nav className="flex items-center">
          {/* <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Button variant="ghost" className="w-9 px-0">
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link> */}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
