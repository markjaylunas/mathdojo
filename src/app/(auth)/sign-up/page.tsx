import OauthButtons from "@/components/auth/oauth/oauth-buttons";
import SignupForm from "@/components/auth/signup/signup-form";
import Heading from "@/components/ui/heading";
import Text from "@/components/ui/text";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Heading>Sign up</Heading>
      <Text className="mb-4">
        Sign up to access all the features of our platform.
      </Text>

      <SignupForm />

      <Text className="text-xs text-center space-x-1">
        <span>Already have an account?</span>
        <Link href="/sign-in" className="underline">
          <span>Sign in</span>
        </Link>
      </Text>

      <OauthButtons />
    </div>
  );
};

export default Page;
