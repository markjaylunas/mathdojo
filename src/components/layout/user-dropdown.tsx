"use client";

import { actionSignOut } from "@/src/actions/auth";
import useUser from "@/src/hooks/use-user";
import { siteConfig } from "@/src/lib/config";
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

const UserDropdown = () => {
  const user = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border-gray-950">
          <AvatarImage src={`${user?.image}`} />
          <AvatarFallback>{getUserInitials(`${user?.name}`)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={siteConfig.links.github} target="_blank">
            GitHub
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => actionSignOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
