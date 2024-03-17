import NewVerificationForm from "@/src/components/auth/new-verification-form";
import { IconLoader2 } from "@tabler/icons-react";
import { Suspense } from "react";

const Page = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center  mb-6">
            <IconLoader2 className="h-12 w-12 animate-spin" />
          </div>
        }
      >
        <NewVerificationForm />
      </Suspense>
    </div>
  );
};

export default Page;
