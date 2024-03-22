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
      <DropdownMenuContent className="mr-2 mt-1 w-56 ">
        {routesConfig.userNav.map((navItem, navItemIndex) => (
          <Fragment key={navItem.title}>
            <DropdownMenuLabel>{navItem.title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {navItem.items.map((item) => (
                <Link href={`${item.href}`} key={item.title}>
                  <DropdownMenuItem>{item.title}</DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
          </Fragment>
        ))}
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;

const LogoutButton = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const handleLogout = () => {
    clearUser();
    actionSignOut();
  };

  return <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>;
};
