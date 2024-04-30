"use client";

import { actionEditProfile } from "@/src/actions/update";
import { BasicUser } from "@/src/lib/types";
import {
  editProfileSchema,
  TEditProfileSchema,
} from "@/src/lib/validationSchema";
import useUserStore from "@/src/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldPath, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import SubmitButton from "../ui/submit-button";
import { toast } from "../ui/use-toast";

type Props = {
  user: BasicUser;
};

const EditProfileForm = ({ user }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, user: userStore } = useUserStore((state) => state);

  const form = useForm<TEditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      id: `${user.id}`,
      image: `${user.image}`,
      name: `${user.name}`,
      username: `${user.username}`,
    },
  });

  const onSubmit = async (data: TEditProfileSchema) => {
    try {
      setIsLoading(true);

      const {
        status,
        message,
        path,
        data: newUser,
      } = await actionEditProfile(data);

      const isError = status === "error";
      if (isError && path) {
        form.setError(path as FieldPath<TEditProfileSchema>, {
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

      if (newUser) {
        if (!userStore) return;
        setUser({
          ...userStore,
          id: `${newUser.id}`,
          name: `${newUser.name}`,
          username: `${newUser.username}`,
          image: `${newUser.image}`,
        });

        router.push(`/user`);
      }
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          Save
        </SubmitButton>
      </form>
    </Form>
  );
};

export default EditProfileForm;
