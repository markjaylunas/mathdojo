import Heading from "@components/ui/heading";
import Text from "@components/ui/text";
import ForgotPasswordForm from "@/src/components/auth/forgot-password/forgot-password-form";
import { Button } from "@/src/components/ui/button";
import { DEFAULT_SIGNIN_PATH } from "@/src/lib/routes";
import Link from "next/link";
import ResetPasswordForm from "@/src/components/auth/reset-password/reset-password-form";

const Page = () => {
  return (
    <div>
      <Heading>Reset password</Heading>

      <Text className="mb-4">Please enter your new password</Text>

      <ResetPasswordForm />

      <Link href={DEFAULT_SIGNIN_PATH}>
        <Button variant="secondary" className="mt-4 w-full">
          Back to Sign In
        </Button>
      </Link>
    </div>
  );
};

export default Page;
