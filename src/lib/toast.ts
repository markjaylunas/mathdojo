import { toast } from "../components/ui/use-toast";

export const toastErrorSomething = () =>
  toast({
    description: "Something went wrong, please try again",
    variant: "destructive",
  });
