import { MainNavItem, SidebarNavItem, UserNavItem } from "@lib/types";
import { DEFAULT_HOME_PATH } from "./routes";

export const siteConfig = {
  name: "mathdojo",
  url: "https://mathdojo.makje.com",
  description: "mathdojo created by Makje",
  links: {
    github: "https://github.com/markjaylunas/mathdojo",
  },
};

export type SiteConfig = typeof siteConfig;

interface RoutesConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  userNav: UserNavItem[];
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
      title: "Main",
      items: [
        {
          title: "Home",
          href: DEFAULT_HOME_PATH,
          items: [],
        },
        {
          title: "History",
          href: "/user",
          items: [],
        },
        {
          title: "Leaderboard",
          href: `/leaderboard?month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}`,
          items: [],
        },
        {
          title: "Shop",
          href: "/shop",
          items: [],
        },
      ],
    },
  ],
  userNav: [
    {
      title: "My Account",
      items: [
        {
          title: "Profile",
          href: "/user",
          items: [],
          icon: "user",
        },
        // {
        //   title: "Setting",
        //   href: "/setting",
        //   items: [],
        //   icon: "setting",
        // },
      ],
    },
    //   items: [
    //     {
    //       title: "GitHub",
    //       href: siteConfig.links.github,
    //       items: [],
    //       icon: "gitHub",
    //     },
    //   ],
    // },
  ],
};
