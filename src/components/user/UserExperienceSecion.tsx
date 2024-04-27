import { calculateExpToNextLevel } from "@/src/lib/game";
import { UserProfile } from "@/src/lib/types";
import { Progress } from "../ui/time-progress";

type Props = {
  profile: UserProfile;
};
const UserExperienceSection = ({ profile }: Props) => {
  const { exp, level } = profile.user;

  const nextLevelExperience = calculateExpToNextLevel({ currentLevel: level });
  const percentage = (exp / nextLevelExperience) * 100;

  return (
    <div>
      <div className="relative">
        <p className="absolute left-1/2  top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-xs  text-white mix-blend-difference">
          {exp} / {nextLevelExperience} Exp
        </p>
        <Progress size="lg" value={percentage} status={"CORRECT"} />
      </div>
    </div>
  );
};

export default UserExperienceSection;
