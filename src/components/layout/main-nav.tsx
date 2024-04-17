"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { routesConfig, siteConfig } from "@lib/config";
import { cn } from "@lib/utils";
import { Icons } from "@components/ui/icons";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { ScrollArea } from "@components/ui/scroll-area";
import { Button } from "@components/ui/button";
import { useStore } from "zustand";
import useLayoutStore from "@/src/store/useLayoutStore";
import useGameSessionStore from "@/src/store/useGameSessionStore";
import { gameRoutes } from "@/src/lib/routes";

export function MainNav() {
  const { sideNavOpen, setSideNavOpen } = useStore(
    useLayoutStore,
    (state) => state
  );

  const pathname = usePathname();

  const { revealAnswer, setRevealAnswer, gameSession, gamePause } = useStore(
    useGameSessionStore,
    (state) => state
  );
  const { status } = gameSession.timer;
  const isGameRunning = status === "RUNNING";

  const isGamePath = gameRoutes.includes(pathname);

  return (
    <div className="flex gap-4">
      <Sheet open={sideNavOpen} onOpenChange={setSideNavOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 "
            onClick={() => isGameRunning && gamePause()}
          >
            <Icons.menu className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <MainLink
            href="/"
            className="flex items-center space-x-2"
            onOpenChange={setSideNavOpen}
          >
            <Icons.logo className="mr-2 h-4 w-4" />
            <span className="font-bold">{siteConfig.name}</span>
          </MainLink>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-2">
              {routesConfig.sidebarNav.map((item, index) => (
                <div key={index} className="flex flex-col space-y-3 pt-6">
                  <h4 className="font-medium">{item.title}</h4>
                  {item?.items?.length &&
                    item.items.map((item) => (
                      <React.Fragment key={item.href}>
                        {!item.disabled &&
                          (item.href ? (
                            <MainLink
                              href={item.href}
                              onOpenChange={setSideNavOpen}
                              className="text-muted-foreground"
                            >
                              {item.title}
                              {item.label && (
                                <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                                  {item.label}
                                </span>
                              )}
                            </MainLink>
                          ) : (
                            item.title
                          ))}
                      </React.Fragment>
                    ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <Link
        href={isGamePath ? "" : "/"}
        className="mr-6 flex items-center space-x-2"
      >
        <Icons.logo
          onClick={
            isGamePath ? () => setRevealAnswer(!revealAnswer) : undefined
          }
          className="h-6 w-6"
        />
        <span className="hidden font-bold sm:inline-block ">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  );
}

interface MainLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MainLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MainLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(
        className,
        pathname === href
          ? "font-medium text-foreground"
          : "text-muted-foreground"
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
