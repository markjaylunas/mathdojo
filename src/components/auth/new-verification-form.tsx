"use client";

import { Card } from "@components/ui/card";
import Heading from "../ui/heading";
import Text from "../ui/text";
import { Button } from "../ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { DEFAULT_SIGNIN_PATH } from "@/src/lib/routes";
import { actionNewVerification } from "@/src/actions/auth";
import { toast } from "../ui/use-toast";
import { toastErrorSomething } from "@/src/lib/toast";
import { ActionResponse } from "@/src/lib/types";
import { cn } from "@/src/lib/utils";
import { IconMailCheck } from "@tabler/icons-react";
import { IconCoins } from "@tabler/icons-react";
import SubmitButton from "../ui/submit-button";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [response, setResponse] = useState<ActionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const onVerifyEmail = async () => {
    try {
      if (response) return;
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-12 px-4 py-6">
      <Heading className="mb-6 text-center">Email Verification</Heading>

      {response && (
        <Card
          className={cn(
            "mb-10 flex items-center justify-center gap-3 pb-8 pt-4"
          )}
        >
          <div className="flex items-center justify-center">
            {response.status === "error" ? (
              <IconCoins className="mt-4 h-6 w-6" />
            ) : (
              <IconMailCheck className="mt-4 h-6 w-6" />
            )}
          </div>
          <Text
            className={cn(
              "mt-0 text-center",
              response.status === "error" ? "text-red-600" : "text-green-600"
            )}
          >
            {response.message}
          </Text>
        </Card>
      )}

      {!response && (
        <div>
          <Text className="mb-6 mt-4 text-center">
            Click the button below to verify your email.
          </Text>
          <SubmitButton
            className="mt-10 w-full"
            onClick={onVerifyEmail}
            loading={isLoading}
          >
            Verify Email
          </SubmitButton>
        </div>
      )}

      {response && (
        <Link href={DEFAULT_SIGNIN_PATH}>
          <Button variant="secondary" className="w-full">
            Back to Sign In
          </Button>
        </Link>
      )}
    </Card>
  );
};

export default NewVerificationForm;
