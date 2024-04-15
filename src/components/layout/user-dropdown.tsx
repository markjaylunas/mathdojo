"use client";

import { actionSignOut } from "@/src/actions/auth";
import { routesConfig } from "@/src/lib/config";
import { getUserInitials } from "@/src/lib/string";
import useUserStore from "@/src/store/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import Link from "next/link";
import { Fragment } from "react";
import { Icons } from "../ui/icons";
import { useTheme } from "next-themes";

type Props = {
  name: string;
  avatar: string;
};

const UserDropdown = ({ name, avatar }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-7 w-7 cursor-pointer border-gray-950">
          <AvatarImage src={avatar} />
          <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 mt-1 min-w-40 ">
        {routesConfig.userNav.map((navItem, navItemIndex) => (
          <Fragment key={navItem.title}>
            <DropdownMenuLabel>{navItem.title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {navItem.items.map((item) => {
                const Icon = item.icon && Icons[item.icon];

                return (
                  <Link href={`${item.href}`} key={item.title}>
                    <DropdownMenuItem>
                      {Icon && <Icon className="mr-2 h-5 w-5" />}
                      {item.title}
                    </DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuGroup>
          </Fragment>
        ))}

        <ThemeButton />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  if (theme === "dark") {
    return (
      <DropdownMenuItem onClick={() => setTheme("light")}>
        <Icons.moon className="mr-2 h-5 w-5" />
        Dark Mode
      </DropdownMenuItem>
    );
  } else
    return (
      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <Icons.sun className="mr-2 h-5 w-5" />
        Light Mode
      </DropdownMenuItem>
    );
};

const LogoutButton = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const handleLogout = () => {
    clearUser();
    actionSignOut();
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <Icons.logout className="mr-2 h-5 w-5" /> Log out
    </DropdownMenuItem>
  );
};
