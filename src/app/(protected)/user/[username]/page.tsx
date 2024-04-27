import { getGameList, getUserProfile } from "@/data/get";
import FollowButton from "@/src/components/user/FollowButton";
import UserExperienceSection from "@/src/components/user/UserExperienceSecion";
import UserHistorySection from "@/src/components/user/UserHistorySection";
import UserMoreInfo from "@/src/components/user/UserMoreInfo";
import UserProfileSection from "@/src/components/user/UserProfileSection";
import { auth } from "@/src/lib/auth";
import { notFound } from "next/navigation";

const UserProfilePage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const { username } = params;
  const session = await auth();

  const profile = await getUserProfile({
    username,
    currentUserId: `${session?.user.id}`,
  });
  if (!profile) return notFound();

  const gameList = await getGameList({ where: { userId: profile.user.id } });

  return (
    <div className="">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col gap-4 sm:flex-row">
          <UserProfileSection user={profile.user} />
          {session?.user.id !== profile.user.id && (
            <FollowButton
              userFollow={profile.followUser}
              followerId={`${session?.user.id}`}
              followingId={profile.user.id}
            />
          )}
        </div>
        <div className="my-4">
          <UserMoreInfo profile={profile} />
        </div>
      </div>

      <UserExperienceSection profile={profile} />

      <UserHistorySection gameList={gameList} />
    </div>
  );
};

export default UserProfilePage;
