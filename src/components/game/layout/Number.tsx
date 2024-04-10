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
  ...props
}: Props) => {
  const valueLength = numberFullValue.toString().length;
  const spaceCount =
    maxDigitLength > valueLength ? maxDigitLength - valueLength : 0;
  const numberValue = `${" ".repeat(spaceCount)}${numberFullValue}`;

  const color =
    status === "correct"
      ? "text-green-600 dark:text-green-700"
      : status === "incorrect"
        ? "text-red-600 dark:text-red-700"
        : "text-gray-600 dark:text-gray-300";

  return (
    <div
      className={`grid grid-flow-col grid-cols-${numberFullValue.toString().length}`}
    >
      {numberValue
        .toString()
        .split("")
        .map((digit, index) => (
          <p
            key={index}
            className={cn(
              "w-8 text-center text-5xl font-bold",
              className,
              color
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
