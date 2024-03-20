import { DEFAULT_SIGNIN_PATH } from "@/src/lib/routes";
import OauthButtons from "@components/auth/oauth/oauth-buttons";
import SignupForm from "@components/auth/signup/signup-form";
import Heading from "@components/ui/heading";
import Text from "@components/ui/text";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Heading>Sign up</Heading>
      <Text className="mb-4">Create an account to start using the app</Text>

      <SignupForm />

      <Text className="space-x-1 text-center text-xs">
        <span>Already have an account?</span>
        <Link href={DEFAULT_SIGNIN_PATH} className="underline">
          <span>Sign in</span>
        </Link>
      </Text>

      <OauthButtons />
    </div>
  );
};

export default Page;
