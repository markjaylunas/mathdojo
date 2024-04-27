import { BasicUser } from "@/src/lib/types";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

type Props = {
  user: BasicUser;
};
const UserProfileSection = ({ user }: Props) => {
  const { id, email, name, username, level } = user;
  return (
    <div className="flex items-center gap-2">
      <UserAvatar user={user} />
      <div>
        <p className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
          {name}
        </p>
        <Link href={`/user/${username ? username : id}`}>
          <p className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-slate-400 hover:underline">
            @{username ? username : email}
          </p>
        </Link>
        <p className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-slate-400">
          Lvl.{level}
        </p>
      </div>
    </div>
  );
};

export default UserProfileSection;
