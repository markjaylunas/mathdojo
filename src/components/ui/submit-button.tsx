import React from "react";
import { Button, ButtonProps } from "@components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";

const SubmitButton = ({
  children,
  loading,
  disabled,
  ...props
}: { loading: boolean } & ButtonProps) => {
  return (
    <Button disabled={loading || disabled} {...props}>
      <div className="flex items-center justify-center gap-1">
        {loading && <IconLoader2 className="h-4 w-4 animate-spin" />}
        {children}
      </div>
    </Button>
  );
};

export default SubmitButton;
export type SubmitButtonProps = React.ComponentProps<typeof SubmitButton>;
