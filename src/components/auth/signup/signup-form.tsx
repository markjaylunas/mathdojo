"use client";

import { TSignupSchema, signupSchema } from "@lib/validationSchema";
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
import { Button } from "@components/ui/button";
import { authSignup } from "@actions/signup";
import { useToast } from "@/src/components/ui/use-toast";
import _ from "lodash";

const SignupForm = () => {
  const { toast } = useToast();

  const form = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TSignupSchema) => {
    try {
      const { status, path, message } = await authSignup(data);
      const isError = status === "error";
      if (isError && path) {
        form.setError(path as FieldPath<TSignupSchema>, {
          type: "validate",
          message,
        });
        return;
      }

      toast({
        title: `Sign up ${isError ? "failed" : "success"}`,
        description: message,
        variant: status === "error" ? "destructive" : "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Sign up failed",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
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
                <Input placeholder="makje@gmail.com" {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
