import SignoutButton from "@/src/components/auth/signout/signout-button";
import { auth } from "@/src/lib/auth";

const Page = async () => {
  const session = await auth();
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignoutButton />
    </div>
  );
};

export default Page;
