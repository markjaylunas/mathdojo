"use client";

import { DEFAULT_OAUTH_SIGNIN_REDIRECT } from "@/src/lib/routes";
import { Button } from "@components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import { Icons } from "../../ui/icons";

const OauthButtons = () => {
  const onSignIn = async (provider: "google" | "github") => {
    await signIn(provider, {
      redirect: false,
      callbackUrl: DEFAULT_OAUTH_SIGNIN_REDIRECT,
    });
  };

  return (
    <div className="w-full space-y-2">
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => onSignIn("google")}
      >
        <div className="mr-2 h-6 w-6">
          <Icons.google />
        </div>
        Continue with Google
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => onSignIn("github")}
      >
        <div className="mr-2 h-6 w-6">
          <Icons.gitHub />
        </div>
        Continue with Github
      </Button>
    </div>
  );
};

export default OauthButtons;
