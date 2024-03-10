"use client";

import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BackButton = ({ children, ...props }: ButtonProps) => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} variant="outline" {...props}>
      {children}
    </Button>
  );
};

export default BackButton;
