import { cn } from "@/src/lib/utils";

export default function EmptyList({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-center p-8">
      <p
        className={cn(
          "whitespace-nowrap text-slate-300 dark:text-gray-700",
          className
        )}
      >
        {children ? children : "Empty List"}
      </p>
    </div>
  );
}
