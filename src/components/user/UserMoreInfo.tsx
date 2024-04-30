import { UserProfile } from "@/src/lib/types";
import Text from "../ui/text";

type Props = {
  profile: UserProfile;
};
const UserMoreInfo = ({ profile }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-around gap-4 sm:justify-start sm:gap-8 md:ml-8">
      <Text className="flex flex-col items-center justify-center">
        {profile.games} <span className="text-xs">Games</span>
      </Text>
      <Text className="flex flex-col items-center justify-center">
        {profile.followers} <span className="text-xs">Followers</span>
      </Text>
      <Text className="flex flex-col items-center justify-center">
        {profile.followings} <span className="text-xs">Following</span>
      </Text>
    </div>
  );
};

export default UserMoreInfo;
