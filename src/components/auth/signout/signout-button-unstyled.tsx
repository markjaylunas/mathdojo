"use client";

import { actionSignOut } from "@/src/actions/auth";
import { ReactNode } from "react";

const SignoutButtonUnstyled = ({ children }: { children: ReactNode }) => {
  return <button onClick={() => actionSignOut()}>{children}</button>;
};

export default SignoutButtonUnstyled;
