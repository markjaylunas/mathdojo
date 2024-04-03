import { Button } from "@/src/components/ui/button";
import Heading from "@/src/components/ui/heading";
import Text from "@/src/components/ui/text";
import { DEFAULT_SIGNIN_PATH } from "@/src/lib/routes";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Heading>Error</Heading>
      <Text className="mt-4">Oops! Something went wrong.</Text>

      <Link href={DEFAULT_SIGNIN_PATH}>
        <Button className="min-w-10">Back to Sign in</Button>
      </Link>
    </div>
  );
};

export default Page;
