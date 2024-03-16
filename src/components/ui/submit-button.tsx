import React from "react";
import { Button, ButtonProps } from "@components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";

const SubmitButton = ({
  children,
  loading,
  ...props
}: { loading: boolean } & ButtonProps) => {
  return (
    <Button disabled={loading} {...props}>
      <div className="flex gap-1 justify-center items-center">
        {loading && <IconLoader2 className="h-4 w-4 animate-spin" />}
        {children}
      </div>
    </Button>
  );
};

export default SubmitButton;
export type SubmitButtonProps = React.ComponentProps<typeof SubmitButton>;
