import OauthButtons from "@/components/auth/oauth/oauth-buttons";
import SigninForm from "@/components/auth/signin/signin-form";
import Heading from "@/components/ui/heading";
import Text from "@/components/ui/text";
import { Separator } from "@radix-ui/react-dropdown-menu";

const Page = () => {
  return (
    <div>
      <Heading>Sign in</Heading>
      <Text className="mb-4">
        Sign in to access your account and start math wars with your friends.
      </Text>

      <SigninForm />

      <OauthButtons />
    </div>
  );
};

export default Page;
