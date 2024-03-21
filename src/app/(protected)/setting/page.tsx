import { auth } from "@/src/lib/auth";

const Page = async () => {
  const session = await auth();

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default Page;
