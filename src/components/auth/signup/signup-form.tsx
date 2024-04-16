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
import { actionSignup } from "@actions/auth";
import { useToast } from "@/src/components/ui/use-toast";
import _ from "lodash";
import SubmitButton from "../../ui/submit-button";
import { useState } from "react";
import { removeSpaceBetweenWords, usernameFormat } from "@/src/lib/string";
import { Button } from "../../ui/button";
import { IconEye } from "@tabler/icons-react";
import { IconEyeClosed } from "@tabler/icons-react";

const SignupForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TSignupSchema) => {
    try {
      setIsLoading(true);
      const { status, path, message } = await actionSignup(data);
      const isError = status === "error";
      if (isError && path) {
        form.setError(path as FieldPath<TSignupSchema>, {
          type: "validate",
          message,
        });
        return;
      }

      toast({
        description: message,
        variant: status === "error" ? "destructive" : "default",
      });
      form.reset();
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="makje"
                  {...field}
                  disabled={isLoading}
                  onChange={(data) =>
                    field.onChange(usernameFormat(data.currentTarget.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Makje"
                  {...field}
                  disabled={isLoading}
                  onChange={(data) =>
                    field.onChange(
                      removeSpaceBetweenWords(data.currentTarget.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    disabled={isLoading}
                    {...field}
                  />

                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-1 top-1/2 h-7 -translate-y-1/2 transform px-2 py-0 "
                  >
                    {passwordVisible ? (
                      <IconEye size="0.9rem" />
                    ) : (
                      <IconEyeClosed size="0.9rem" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton loading={isLoading} className="w-full" type="submit">
          Sign Up
        </SubmitButton>
      </form>
    </Form>
  );
};

export default SignupForm;
