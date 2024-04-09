import { cn } from "@/src/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const headingVariants = cva("scroll-m-20 font-extrabold tracking-tight", {
  variants: {
    order: {
      default: "text-3xl",
      "2xl": "text-2xl ",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl",
      "8xl": "text-8xl",
      "9xl": "text-9xl",
    },
  },
  defaultVariants: {
    order: "default",
  },
});

const Heading: React.FC<
  React.HTMLProps<HTMLHeadingElement> & VariantProps<typeof headingVariants>
> = ({ children, className, order, ...props }) => {
  return (
    <h2 className={cn(headingVariants({ order, className }))} {...props}>
      {children}
    </h2>
  );
};

export default Heading;
