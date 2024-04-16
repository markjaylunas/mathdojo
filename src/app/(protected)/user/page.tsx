import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";

const UserRoutePage = async () => {
  const session = await auth();
  if (session) redirect(`/user/${session.user.username}`);
  return null;
};

export default UserRoutePage;
