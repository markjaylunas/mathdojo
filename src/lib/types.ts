import { Icons } from "@components/ui/icons";
import { User } from "next-auth";

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
};

export type NavItemWithChildren = NavItem & {
  items: NavItemWithChildren[];
};

export type MainNavItem = NavItem & {};
export type UserNavItem = NavItemWithChildren & {};

export type SidebarNavItem = NavItemWithChildren & {};

export type ActionResponse = {
  status: "success" | "error";
  path?: string;
  message: string;
};

export type Role = "ADMIN" | "USER";

export type TUser = (User & { role: Role }) | null | undefined;
