import { cn } from "@/src/lib/utils";

const Text: React.FC<React.HTMLProps<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={cn(
        "text-pretty leading-7 text-gray-600 dark:text-gray-300", // [&:not(:first-child)]:mt-4
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;
