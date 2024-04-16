import { getUserById, getUserByUsername } from "@/data/get";
import UserProfileSection from "@/src/components/user/UserProfileSection";
import { notFound } from "next/navigation";

const UserProfilePage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  const userById = await getUserById({ id: userId });
  const userByUsername = await getUserByUsername({ username: userId });
  const user = userById || userByUsername;
  if (!user) return notFound();

  return (
    <div className="">
      <UserProfileSection user={user} />
    </div>
  );
};

export default UserProfilePage;
