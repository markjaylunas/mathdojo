import { useSession } from "next-auth/react";

const useUser = () => {
  const data = useSession();
  console.log(data);
  return data.data?.user;
};

export default useUser;
