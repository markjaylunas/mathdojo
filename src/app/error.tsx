"use client";

import BackButton from "@components/ui/back-button";
import { Button } from "@components/ui/button";
import { IconArrowBack, IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { DEFAULT_HOME_PATH } from "../lib/routes";

export default async function ErrorPage() {
  return (
    <div className="container mx-auto flex max-w-lg flex-col items-center justify-center gap-6 p-8">
      <h2 className="mt-10 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Oops, something went wrong!
      </h2>
      <p>
        We&apos;re sorry for the inconvenience. Please try again, or if the
        problem persists, contact our support team.
      </p>

      <div className="flex justify-center gap-4 ">
        <BackButton className="flex gap-1">
          <IconArrowBack height={20} /> Get back
        </BackButton>
        <Link href={DEFAULT_HOME_PATH}>
          <Button className="flex gap-1">
            <IconHome size={18} /> Get to home page
          </Button>
        </Link>
      </div>
    </div>
  );
}
