import Heading from "@components/ui/heading";
import Text from "@components/ui/text";
import CreateUsernameForm from "@/src/components/auth/create-username/CreateUsernameForm";
import { auth } from "@/src/lib/auth";
import { DEFAULT_SIGNIN_PATH, DEFAULT_SIGNIN_REDIRECT } from "@/src/lib/routes";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (session?.user?.username) {
    redirect(DEFAULT_SIGNIN_REDIRECT);
  }
  const userId = `${session?.user?.id}`;

  if (!session && !userId) {
    redirect(DEFAULT_SIGNIN_PATH);
  }

  return (
    <div className="mx-auto">
      <Heading>Create Username</Heading>

      <Text className="my-4">Please create a username to continue</Text>

      <CreateUsernameForm userId={userId} />
    </div>
  );
};

export default Page;
