import { Icons } from "@/src/components/ui/icons";
import { Separator } from "@/src/components/ui/separator";
import { siteConfig } from "@/src/lib/config";
import { DEFAULT_SIGNIN_PATH } from "@/src/lib/routes";
import OauthButtons from "@components/auth/oauth/oauth-buttons";
import SignupForm from "@components/auth/signup/signup-form";
import Heading from "@components/ui/heading";
import Text from "@components/ui/text";
import Link from "next/link";

const Page = () => {
  return (
    <section className="space-y-8 pb-8">
      <h1 className="flex items-center justify-center gap-2 text-5xl font-bold">
        <Icons.logo className="size-16" />
        <span className="">{siteConfig.name}</span>
      </h1>

      <OauthButtons />

      <Separator />

      <section>
        <Heading className="mt-4">Sign up</Heading>

        <Text className="my-4">Create an account to start using the app</Text>

        <SignupForm />

        <Text className="mt-4 space-x-1 text-center text-xs">
          <span>Already have an account?</span>
          <Link href={DEFAULT_SIGNIN_PATH} className="underline">
            <span>Sign in</span>
          </Link>
        </Text>
      </section>
    </section>
  );
};

export default Page;
