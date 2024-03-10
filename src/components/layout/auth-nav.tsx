"use client";

import React from "react";
import { ModeToggle } from "../theme/theme-toggler";
import Link from "next/link";
import { Button } from "../ui/button";
import { IconLogin2 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { AUTH_PAGE } from "@/lib/constants";

const AuthNav = () => {
  const pathname = usePathname();
  const isSignedIn = false;
  const isAuthPage = AUTH_PAGE.includes(pathname);
  return (
    <nav className="flex items-center gap-2">
      {/* <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Button variant="ghost" className="w-9 px-0">
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link> */}
      {!isSignedIn && !isAuthPage && (
        <Link href="/sign-in">
          <Button variant="outline" className="px-3">
            <IconLogin2 className="mr-1 h-4" />
            Sign in
          </Button>
        </Link>
      )}
      {!isSignedIn && <ModeToggle />}
    </nav>
  );
};

export default AuthNav;
