import { useSession } from "next-auth/react";

const useCurrentUser = () => {
  const data = useSession();
  return data.data?.user;
};

export default useCurrentUser;
