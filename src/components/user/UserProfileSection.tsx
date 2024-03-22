import { User } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

type Props = {
  user: User;
};
const UserProfileSectin = ({ user }: Props) => {
  const { id, email, name, username } = user;
  return (
    <div className="flex items-center gap-2">
      <UserAvatar user={user} />
      <div>
        <p className="text-sm">{name}</p>
        <Link href={`/user/${username ? username : id}`}>
          <p className="text-xs text-slate-400 hover:underline">
            @{username ? username : email}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default UserProfileSectin;
