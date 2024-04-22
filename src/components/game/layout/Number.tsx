import { Problem } from "@/src/lib/types";
import { cn } from "@/src/lib/utils";
import React from "react";

type Props = {
  numberFullValue: number;
  maxDigitLength: number;
  status?: Problem["status"];
} & React.HTMLAttributes<HTMLParagraphElement>;

const Number = ({
  children,
  className,
  numberFullValue,
  maxDigitLength,
  status,
  hidden,
  ...props
}: Props) => {
  const valueLength = numberFullValue.toString().length;
  const spaceCount =
    maxDigitLength > valueLength ? maxDigitLength - valueLength : 0;
  const numberValue = `${" ".repeat(spaceCount)}${numberFullValue}`;
  const size =
    maxDigitLength > 7
      ? "text-4xl w-6"
      : maxDigitLength > 4
        ? "text-5xl w-8"
        : "text-6xl w-10";

  const color =
    status === "CORRECT"
      ? "text-green-600 dark:text-green-700"
      : status === "WRONG"
        ? "text-red-600 dark:text-red-700"
        : "text-gray-600 dark:text-gray-300";

  return (
    <div
      className={cn(
        `grid grid-flow-col grid-cols-${numberFullValue.toString().length}`,
        hidden && "text-transparent"
      )}
    >
      {numberValue
        .toString()
        .split("")
        .map((digit, index) => (
          <p
            key={index}
            className={cn(
              "text-center  font-bold",
              size,
              className,
              color,
              hidden && "text-transparent"
            )}
            {...props}
          >
            {digit}
          </p>
        ))}
    </div>
  );
};

export default Number;
