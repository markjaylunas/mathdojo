import { getUserById, getUserByUsername } from "@/data/user";
import UserProfileSection from "@/src/components/user/UserProfileSection";
import { User } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

const UserProfilePage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  let user: User | null = null;
  user = await getUserByUsername({ username: userId });
  if (!user) user = await getUserById({ id: userId });
  if (!user) return notFound();
  if (userId !== user.username) redirect(`/user/${user.username}`);

  return (
    <div className="py-8">
      <UserProfileSection user={user} />
    </div>
  );
};

export default UserProfilePage;
