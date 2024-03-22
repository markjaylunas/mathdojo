"use client";

import { ModeToggle } from "../theme/theme-toggler";
import Link from "next/link";
import { Button } from "../ui/button";
import { IconLogin2 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { DEFAULT_SIGNIN_PATH, publicRoutes } from "@/src/lib/routes";
import UserDropdown from "./user-dropdown";
import useUserStore from "@/src/store/useUserStore";
import { useEffect } from "react";
import useCurrentUser from "@/src/hooks/use-current-user";

const AuthNav = () => {
  const pathname = usePathname();
  const isPublicPage = publicRoutes.includes(pathname);
  const userStore = useUserStore((state) => state.user);
  const user = useCurrentUser();
  const avatar = user ? user.image : userStore?.image;
  const name = user ? user.name : userStore?.name;

  useEffect(() => {
    useUserStore.persist.rehydrate();
  }, []);

  return (
    <nav className="flex items-center gap-2">
      {/* <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Button variant="ghost" className="w-9 px-0">
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link> */}
      {!user && isPublicPage && (
        <Link href={DEFAULT_SIGNIN_PATH}>
          <Button variant="outline" className="px-3">
            <IconLogin2 className="mr-1 h-4" />
            Sign in
          </Button>
        </Link>
      )}

      {!name && <ModeToggle />}
      {name && <UserDropdown name={name} avatar={`${avatar}`} />}
    </nav>
  );
};

export default AuthNav;
