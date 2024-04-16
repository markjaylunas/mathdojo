import { getGameList, getUserById, getUserByUsername } from "@/data/get";
import UserHistorySection from "@/src/components/user/UserHistorySection";
import UserProfileSection from "@/src/components/user/UserProfileSection";
import { notFound } from "next/navigation";

const UserProfilePage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  const userById = await getUserById({ id: userId });
  const userByUsername = await getUserByUsername({ username: userId });
  const user = userById || userByUsername;
  if (!user) return notFound();

  const gameList = await getGameList({ where: { userId: user.id } });

  return (
    <div className="">
      <UserProfileSection user={user} />
      <UserHistorySection gameList={gameList} />
    </div>
  );
};

export default UserProfilePage;
