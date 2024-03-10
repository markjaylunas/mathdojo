export const siteConfig = {
  name: "mathwars",
  url: "https://mathwars.makje.com",
  description: "Mathwars created by Makje",
  links: {
    github: "https://github.com/markjaylunas",
  },
};

export type SiteConfig = typeof siteConfig;

import { MainNavItem, SidebarNavItem } from "@/lib/types";

interface RoutesConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const routesConfig: RoutesConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  sidebarNav: [
    {
      title: "Categories",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          items: [],
        },
        {
          title: "Home",
          href: "/",
          items: [],
        },
      ],
    },
    {
      title: "Setting",
      items: [
        {
          title: "User",
          href: "/user/setting",
          items: [],
        },
      ],
    },
  ],
};
