import NewVerificationForm from "@/src/components/auth/new-verification-form";
import { IconLoader2 } from "@tabler/icons-react";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="flex justify-center">
      <Suspense
        fallback={
          <div className="mb-6 flex items-center  justify-center">
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
