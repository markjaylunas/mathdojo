"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { IconLogin2 } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import {
  CLASSIC_GAME_PATH,
  DEFAULT_SIGNIN_PATH,
  gameRoutes,
  publicRoutes,
} from "@/src/lib/routes";
import UserDropdown from "./user-dropdown";
import useUserStore from "@/src/store/useUserStore";
import { useEffect } from "react";
import useCurrentUser from "@/src/hooks/use-current-user";
import { Icons } from "../ui/icons";
import { useStore } from "zustand";

const AuthNav = () => {
  const pathname = usePathname();
  const isPublicPage = publicRoutes.includes(pathname);
  const userStore = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const user = useCurrentUser();

  const onSetUser = async () => {
    if (userStore?.id !== user?.id) {
      const newUser = {
        id: `${user?.id}`,
        email: `${user?.email}`,
        name: `${user?.name}`,
        image: `${user?.image}`,
        role: user?.role || "USER",
        username: user?.username,
      };

      setUser(newUser);
    }
  };

  useEffect(() => {
    useUserStore.persist.rehydrate();
    onSetUser();
  }, [user]);
  return (
    <nav className="flex items-center gap-2">
      {!userStore?.username &&
        isPublicPage &&
        DEFAULT_SIGNIN_PATH !== pathname && (
          <Link href={DEFAULT_SIGNIN_PATH}>
            <Button variant="outline" className="px-3">
              <IconLogin2 className="mr-1 h-4" />
              Sign in
            </Button>
          </Link>
        )}

      {/* {!userStore && <ModeToggle />} */}
      {userStore && !gameRoutes.includes(pathname) && userStore.username && (
        <Link href={CLASSIC_GAME_PATH}>
          <Button className="px-3">
            <Icons.mathSymbols className="mr-1 h-4" />
            Play
          </Button>
        </Link>
      )}
      {userStore && (
        <UserDropdown name={userStore?.name} avatar={`${userStore?.image}`} />
      )}
    </nav>
  );
};

export default AuthNav;
