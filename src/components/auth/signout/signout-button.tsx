"use client";

import React, { useState } from "react";
import { actionSignOut } from "@/src/actions/auth";
import SubmitButton from "../../ui/submit-button";
import { useStore } from "zustand";
import useUserStore from "@/src/store/useUserStore";

const SignoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const clearUser = useStore(useUserStore, (state) => state.clearUser);

  const handleSignout = async () => {
    try {
      setIsLoading(true);
      await actionSignOut();
      clearUser();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SubmitButton loading={isLoading} onClick={handleSignout}>
      Sign out
    </SubmitButton>
  );
};

export default SignoutButton;
