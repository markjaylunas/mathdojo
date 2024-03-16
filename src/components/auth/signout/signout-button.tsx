"use client";

import React from "react";
import { Button } from "../../ui/button";
import { actionSignOut } from "@/src/actions/auth";

const SignoutButton = () => {
  return <Button onClick={() => actionSignOut()}>Sign out</Button>;
};

export default SignoutButton;
