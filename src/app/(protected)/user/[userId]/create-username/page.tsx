import Heading from "@components/ui/heading";
import Text from "@components/ui/text";
import CreateUsernameForm from "@/src/components/auth/create-username/CreateUsernameForm";

const Page = ({ params }: { params: { userId: string } }) => {
  return (
    <div className="mx-auto">
      <Heading>Create Username</Heading>

      <Text className="my-4">Please create a username to continue</Text>

      <CreateUsernameForm userId={params.userId} />
    </div>
  );
};

export default Page;
