import OauthButtons from "@components/auth/oauth/oauth-buttons";
import Heading from "@components/ui/heading";
import Text from "@components/ui/text";
import SigninForm from "@components/auth/signin/signin-form";

import Link from "next/link";
import {
  DEFAULT_FORGOT_PASSWORD_PATH,
  DEFAULT_SIGNUP_PATH,
} from "@/src/lib/routes";
import { SiteFooter } from "../components/layout/site-footer";
import { SiteHeader } from "../components/layout/site-header";

const Page = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className=" mx-auto max-w-3xl flex-col border-0 sm:border-x">
          <div className=" min-h-screen px-8">
            <div className="flex justify-center p-8">
              <div className="mt-4 max-w-[520px]">
                <Heading>Sign in</Heading>
                <Text className="my-4">
                  Sign in to access your account and start math wars with your
                  friends.
                </Text>

                <SigninForm />

                <Link href={DEFAULT_FORGOT_PASSWORD_PATH}>
                  <Text className="mt-4 text-center text-xs underline">
                    Forgot password?
                  </Text>
                </Link>

                <OauthButtons />

                <Text className="mt-4 space-x-1 text-center text-xs">
                  <span>Don&apos;t have an account?</span>
                  <Link href={DEFAULT_SIGNUP_PATH} className="underline">
                    <span>Sign up</span>
                  </Link>
                </Text>
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
