import Heading from "@components/ui/heading";
import Text from "@components/ui/text";
import ForgotPasswordForm from "@/src/components/auth/forgot-password/forgot-password-form";
import { Button } from "@/src/components/ui/button";
import { DEFAULT_SIGNIN_PATH } from "@/src/lib/routes";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Heading>Forgot password</Heading>

      <Text className="mb-4">
        Enter your email address and we will send you a link to reset your
        password.
      </Text>

      <ForgotPasswordForm />

      <Link href={DEFAULT_SIGNIN_PATH}>
        <Button variant="secondary" className="mt-4 w-full">
          Back to Sign In
        </Button>
      </Link>
    </div>
  );
};

export default Page;
