import { useSession } from "next-auth/react";

const useUser = () => {
  const { data: user } = useSession();
  return user;
};

export default useUser;
