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
import { getUserById } from "@/data/user";

const AuthNav = () => {
  const pathname = usePathname();
  const isPublicPage = publicRoutes.includes(pathname);
  const userStore = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const user = useCurrentUser();
  const onSetUser = async () => {
    if (user) {
      const newUser = {
        id: `${user.id}`,
        email: `${user.email}`,
        name: `${user.name}`,
        image: `${user.image}`,
        role: user.role,
      };

      setUser(newUser);
    }
  };

  useEffect(() => {
    useUserStore.persist.rehydrate();
    onSetUser();
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

      {/* {!userStore && <ModeToggle />} */}
      {userStore && (
        <UserDropdown name={userStore?.name} avatar={`${userStore?.image}`} />
      )}
      <ModeToggle />
    </nav>
  );
};

export default AuthNav;
