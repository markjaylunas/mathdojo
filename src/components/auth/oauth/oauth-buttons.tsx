import { Button } from "@components/ui/button";
import { Icons } from "@components/ui/icons";
import { Separator } from "@components/ui/separator";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import React from "react";

const OauthButtons = () => {
  return (
    <div className="space-y-2 w-full">
      <Separator className="my-4" />
      <Button variant="outline" size="lg" className="w-full">
        <div className="mr-2 h-6 w-6">
          <IconBrandGoogle />
        </div>
        Continue with Google
      </Button>
      <Button variant="outline" size="lg" className="w-full">
        <div className="mr-2 h-6 w-6">
          <IconBrandGithub />
        </div>
        Continue with Github
      </Button>
    </div>
  );
};

export default OauthButtons;
