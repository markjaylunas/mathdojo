"use client";

import { TSigninSchema, signinSchema } from "@lib/validationSchema";
import { FieldPath, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { actionSignin } from "@/src/actions/auth";
import { useToast } from "@/src/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SubmitButton from "../../ui/submit-button";
import { DEFAULT_SIGNIN_REDIRECT } from "@/src/lib/routes";
import { Button } from "../../ui/button";
import { IconEye } from "@tabler/icons-react";
import { IconEyeClosed } from "@tabler/icons-react";

const SigninForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm<TSigninSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TSigninSchema) => {
    try {
      setIsLoading(true);
      const { status, message, path } = await actionSignin(data);
      const isError = status === "error";
      if (isError && path) {
        form.setError(path as FieldPath<TSigninSchema>, {
          type: "validate",
          message,
        });
        return;
      }

      toast({
        description: message,
        variant: status === "error" ? "destructive" : "default",
      });
      if (isError) return;

      form.reset();
      router.push(DEFAULT_SIGNIN_REDIRECT);
    } catch (error) {
      console.error(error);
      toast({
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="makje@gmail.com"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    className="pr-10"
                    {...field}
                    disabled={isLoading}
                  />

                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-1 top-1/2 h-7 -translate-y-1/2 transform px-2 py-0 "
                  >
                    {passwordVisible ? (
                      <IconEye size="0.9rem" className="opacity-50" />
                    ) : (
                      <IconEyeClosed size="0.9rem" className="opacity-50" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton loading={isLoading} className="w-full" type="submit">
          Submit
        </SubmitButton>
      </form>
    </Form>
  );
};

export default SigninForm;
