import OauthButtons from "@components/auth/oauth/oauth-buttons";
import Heading from "@components/ui/heading";
import Text from "@components/ui/text";
import SigninForm from "@components/auth/signin/signin-form";

import Link from "next/link";
import { DEFAULT_SIGNUP_PATH } from "@/src/lib/routes";

const Page = () => {
  return (
    <div>
      <Heading>Sign in</Heading>
      <Text className="mb-4">
        Sign in to access your account and start math wars with your friends.
      </Text>

      <SigninForm />

      <Text className="space-x-1 text-center text-xs">
        <span>Already have an account?</span>
        <Link href={DEFAULT_SIGNUP_PATH} className="underline">
          <span>Sign up</span>
        </Link>
      </Text>

      <OauthButtons />
    </div>
  );
};

export default Page;
