import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { IconArrowBack, IconHome } from "@tabler/icons-react";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="space-y-6">
      <h2 className="text-4xl text-center mt-10 font-extrabold tracking-tight lg:text-5xl">
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
        <Button className="flex gap-1">
          <IconHome size={18} /> Get to home page
        </Button>
      </div>
    </div>
  );
}
