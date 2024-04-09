"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/src/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const progressVariants = cva("h-full w-full flex-1 bg-primary transition-all", {
  variants: {
    size: {
      default: "h-2",
      sm: "h-2 ",
      md: "h-4 ",
      lg: "h-6 ",
    },
  },
  defaultVariants: {
    size: "default",
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
>(({ className, value, size, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      `relative w-full overflow-hidden rounded-full bg-primary/20`,
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressVariants({ size, className }))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
