import OauthButtons from "@components/auth/oauth/oauth-buttons";
import SigninForm from "@components/auth/signin/signin-form";
import Heading from "@components/ui/heading";
import Text from "@components/ui/text";

import {
  DEFAULT_FORGOT_PASSWORD_PATH,
  DEFAULT_SIGNUP_PATH,
} from "@/src/lib/routes";
import Link from "next/link";
import { SiteFooter } from "../components/layout/site-footer";
import { SiteHeader } from "../components/layout/site-header";
import { Icons } from "../components/ui/icons";
import { Separator } from "../components/ui/separator";
import { siteConfig } from "../lib/config";

const Page = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className=" mx-auto max-w-3xl flex-col border-0 sm:border-x">
          <div className=" min-h-screen px-8">
            <div className="flex justify-center">
              <div className="my-8 max-w-[520px] space-y-8">
                <h1 className="flex items-center justify-center gap-2 text-5xl font-bold">
                  <Icons.logo className="size-16" />
                  <span className="">{siteConfig.name}</span>
                </h1>

                <section>
                  <Heading className="mt-4">Sign in</Heading>
                  <Text className="my-4">
                    Sign in to access your account and start mathdojo with your
                    friends.
                  </Text>
                </section>

                <OauthButtons />

                <Separator />

                <section>
                  <SigninForm />

                  <Link href={DEFAULT_FORGOT_PASSWORD_PATH}>
                    <Text className="mt-4 text-center text-xs underline">
                      Forgot password?
                    </Text>
                  </Link>

                  <Text className="mt-4 space-x-1 text-center text-xs">
                    <span>Don&apos;t have an account?</span>
                    <Link href={DEFAULT_SIGNUP_PATH} className="underline">
                      <span>Sign up</span>
                    </Link>
                  </Text>
                </section>
              </div>
            </div>
          </div>
        </div>
        <SiteFooter />
      </main>
    </div>
  );
};

export default Page;
