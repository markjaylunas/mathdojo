"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/src/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const progressVariants = cva("h-full w-full flex-1 bg-primary transition-all", {
  variants: {
    status: {
      unanswered: "",
      correct: "bg-green-600 dark:bg-green-700",
      incorrect: "bg-red-600 dark:bg-red-700",
    },
    size: {
      default: "h-2",
      sm: "h-2 ",
      md: "h-4 ",
      lg: "h-6 ",
    },
  },
  defaultVariants: {
    size: "default",
    status: "unanswered",
  },
});

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  asChild?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, size, status, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      `relative w-full overflow-hidden rounded-full bg-primary/10 `,
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressVariants({ size, status, className }))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
