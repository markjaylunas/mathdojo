import { getUserById } from "@/data/user";
import { auth } from "@/src/lib/auth";
import { DEFAULT_SIGNIN_PATH } from "@/src/lib/routes";
import { redirect } from "next/navigation";

const UserProfilePage = async () => {
  const userSession = await auth();
  if (!userSession) return redirect(DEFAULT_SIGNIN_PATH);
  const user = await getUserById({ id: `${userSession.user.id}` });

  return (
    <div>
      UserProfile Page
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default UserProfilePage;
