"use client";

import {
  createUsernameSchema,
  TCreateUsernameSchema,
} from "@lib/validationSchema";
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
import { useToast } from "@/src/components/ui/use-toast";
import { useEffect, useState } from "react";
import SubmitButton from "../../ui/submit-button";
import { notFound, useRouter } from "next/navigation";
import { actionCreateUsername } from "@/src/actions/auth";
import { DEFAULT_SIGNIN_REDIRECT } from "@/src/lib/routes";
import { useStore } from "zustand";
import useUserStore from "@/src/store/useUserStore";
import useCurrentUser from "@/src/hooks/use-current-user";

const CreateUsernameForm = (params: { userId: string }) => {
  const { userId } = params;
  if (!userId) notFound();
  const setUser = useStore(useUserStore, (state) => state.setUser);
  const sessionUser = useCurrentUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TCreateUsernameSchema>({
    resolver: zodResolver(createUsernameSchema),
    defaultValues: {
      username: "",
      id: userId,
    },
  });

  const onSubmit = async (data: TCreateUsernameSchema) => {
    try {
      setIsLoading(true);
      const {
        status,
        message,
        path,
        data: updatedUser,
      } = await actionCreateUsername(data);

      const isError = status === "error";
      if (isError && path) {
        form.setError(path as FieldPath<TCreateUsernameSchema>, {
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
      if (!updatedUser) throw new Error("User not found");

      form.reset();

      setUser({
        id: updatedUser.id,
        email: `${updatedUser.email}`,
        username: `${updatedUser.username}`,
        name: `${updatedUser.name}`,
        role: `${updatedUser.role}`,
        image: `${updatedUser?.image}`,
      });

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

  // useEffect(() => {
  //   if (sessionUser) {
  //     if (sessionUser.username.length > 0) {
  //       router.push(DEFAULT_SIGNIN_REDIRECT);
  //     }
  //   }
  // }, [sessionUser]);

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
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton loading={isLoading} className="w-full" type="submit">
          Continue
        </SubmitButton>
      </form>
    </Form>
  );
};

export default CreateUsernameForm;
