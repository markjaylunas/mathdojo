"use client";

import React, { useState } from "react";
import { actionSignOut } from "@/src/actions/auth";
import SubmitButton from "../../ui/submit-button";

const SignoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignout = async () => {
    try {
      setIsLoading(true);
      await actionSignOut();
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
