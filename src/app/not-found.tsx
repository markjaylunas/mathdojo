import BackButton from "@components/ui/back-button";
import { Button } from "@components/ui/button";
import { IconArrowBack, IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { DEFAULT_HOME_PATH } from "../lib/routes";

export default async function NotFound() {
  return (
    <div className="container mx-auto flex max-w-lg flex-col items-center justify-center gap-6 p-8">
      <h2 className="mt-10 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        404 - Not Found
      </h2>
      <p>
        Page you are trying to open does not exist. You may have mistyped the
        address, or the page has been moved to another URL. If you think this is
        an error contact support.
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
