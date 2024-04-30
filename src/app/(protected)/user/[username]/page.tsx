import { getGameList, getUserProfile } from "@/data/get";
import EditProfile from "@/src/components/user/EditProfile";
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
    <>
      <section className="flex flex-col  sm:flex-row">
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          <UserProfileSection user={profile.user} />
          {session?.user.id !== profile.user.id ? (
            <FollowButton
              userFollow={profile.followUser}
              followerId={`${session?.user.id}`}
              followingId={profile.user.id}
            />
          ) : (
            <EditProfile user={profile.user} />
          )}
        </div>
        <div className="my-4 flex-none sm:flex-1">
          <UserMoreInfo profile={profile} />
        </div>
      </section>

      <UserExperienceSection profile={profile} />

      <UserHistorySection gameList={gameList} />
    </>
  );
};

export default UserProfilePage;
