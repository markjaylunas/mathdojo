import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { IconGhost } from "@tabler/icons-react";

type Props = {
  user: User;
};
const UserAvatar = ({ user }: Props) => {
  const { id, username, image } = user;
  return (
    <Avatar className={cn("cursor-pointer border-gray-950")}>
      <Link href={`/user/${username ? username : id}`}>
        <AvatarImage src={`${image}`} />
        <AvatarFallback className="w-full">
          <IconGhost />
        </AvatarFallback>
      </Link>
    </Avatar>
  );
};

export default UserAvatar;
