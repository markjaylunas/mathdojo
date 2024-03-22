"use client";

import useCurrentUser from "@/src/hooks/use-current-user";
import { routesConfig } from "@/src/lib/config";
import { getUserInitials } from "@/src/lib/string";
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

const UserDropdown = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-7 w-7 cursor-pointer border-gray-950">
          <AvatarImage src={`${user?.image}`} />
          <AvatarFallback>{getUserInitials(`${user?.name}`)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 mt-1 w-56 ">
        {routesConfig.userNav.map((navItem, navItemIndex) => (
          <Fragment key={navItem.title}>
            <DropdownMenuLabel>{navItem.title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {navItem.items.map((item) => {
                return !item.onClick && item.href ? (
                  <Link href={item.href} key={item.title}>
                    <DropdownMenuItem>{item.title}</DropdownMenuItem>
                  </Link>
                ) : (
                  <DropdownMenuItem key={item.title} onClick={item.onClick}>
                    {item.title}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
