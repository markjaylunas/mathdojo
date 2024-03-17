"use client";

import { Card } from "@components/ui/card";
import Heading from "../ui/heading";
import Text from "../ui/text";
import { Button } from "../ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { DEFAULT_SIGNIN_PATH } from "@/src/lib/routes";
import { actionNewVerification } from "@/src/actions/auth";
import { toast } from "../ui/use-toast";
import { toastErrorSomething } from "@/src/lib/toast";
import { ActionResponse } from "@/src/lib/types";
import { cn } from "@/src/lib/utils";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [response, setResponse] = useState<ActionResponse | null>(null);
  const onSubmit = useCallback(async () => {
    try {
      if (!token) {
        toast({
          description: "Missing token",
          variant: "destructive",
        });

        setResponse({ status: "error", message: "Missing token" });
        return null;
      }

      const verification = await actionNewVerification({ token });

      toast({
        description: verification.message,
        variant: verification.status === "error" ? "destructive" : "default",
      });

      setResponse({
        status: verification.status,
        message: verification.message,
      });
    } catch (error) {
      toastErrorSomething();
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="py-6 px-4 mt-12">
      <Heading className="text-center mb-6">Email Verification</Heading>

      {response ? (
        <Text
          className={cn(
            "text-center mb-6",
            response.status === "error" ? "text-red-600" : "text-green-600"
          )}
        >
          {response.message}
        </Text>
      ) : (
        <div>
          <Text className="text-center mb-6">Confirming your email.</Text>
          <div className="flex justify-center items-center  mb-6">
            <IconLoader2 className="h-12 w-12 animate-spin" />
          </div>
        </div>
      )}

      <Link href={DEFAULT_SIGNIN_PATH}>
        <Button variant="secondary" className="w-full">
          Back to Sign In
        </Button>
      </Link>
    </Card>
  );
};

export default NewVerificationForm;
