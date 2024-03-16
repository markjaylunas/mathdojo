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
import { DEFAULT_LOGIN_REDIRECT } from "@/src/lib/routes";

const SigninForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
        title: `Sign in ${isError ? "failed" : "success"}`,
        description: message,
        variant: status === "error" ? "destructive" : "default",
      });
      if (isError) return;

      form.reset();
      router.push(DEFAULT_LOGIN_REDIRECT);
    } catch (error) {
      console.error(error);
      toast({
        title: "Sign in failed",
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
                <Input type="password" {...field} disabled={isLoading} />
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
