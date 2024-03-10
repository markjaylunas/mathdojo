import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import React from "react";

const OauthButtons = () => {
  return (
    <div className="space-y-2 w-full">
      <Separator className="my-4" />
      <Button variant="outline" size="lg" className="w-full">
        <Icons.google className="mr-2 h-6 w-6" />
        Continue with Google
      </Button>
      <Button variant="outline" size="lg" className="w-full">
        <Icons.gitHub className="mr-2 h-6 w-6" />
        Continue with Github
      </Button>
    </div>
  );
};

export default OauthButtons;
