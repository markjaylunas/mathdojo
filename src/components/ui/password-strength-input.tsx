import { Progress } from "@/src/components/ui/time-progress";
import { cn } from "@/src/lib/utils";
import { TSignupSchema } from "@/src/lib/validationSchema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input, InputProps } from "./input";
import Text from "./text";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      className={cn(
        "mt-4 flex align-middle text-sm",
        meets ? "text-teal-600" : "text-red-600"
      )}
    >
      {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />}{" "}
      <span className="ml-3 ">{label}</span>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  {
    re: /[$&+,:;=?@#|'<>.^*()%!-]/,
    label: "Includes special symbol (e.g: $&+,:;=?@#|'<>.^*()%!-)",
  },
];

function getStrength(password: string) {
  let multiplier = password?.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const PasswordStrengthInput = (field: InputProps) => {
  const form = useFormContext<TSignupSchema>();
  const passwordValue = useWatch({ name: "password" });
  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(passwordValue)}
    />
  ));

  const strength = getStrength(passwordValue);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Popover open={popoverOpened} onOpenChange={setPopoverOpened}>
      <PopoverTrigger className="w-full">
        <Input {...field} className="w-full" />
      </PopoverTrigger>
      <PopoverContent className=" md:w-[450px]">
        <Progress value={strength} className={cn(color, "text-md mb-4")} />
        <PasswordRequirement
          label="Includes at least 6 characters"
          meets={passwordValue?.length > 5}
        />
        {checks}
      </PopoverContent>
    </Popover>
  );
};

export default PasswordStrengthInput;
