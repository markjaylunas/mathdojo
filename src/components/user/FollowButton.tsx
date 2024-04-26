"use client";

import { actionUnfollowUser } from "@/src/actions/delete";
import { actionFollowUser } from "@/src/actions/post";
import { Follower } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SubmitButton from "../ui/submit-button";
import { toast } from "../ui/use-toast";

type Props = {
  userFollow: Follower | null;
  userId: string;
  followerId: string;
};

const FollowButton = ({ followerId, userId, userFollow }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      let newFollower = null;
      if (userFollow) {
        newFollower = await actionUnfollowUser({
          id: userFollow.id,
          path: pathname,
        });
      } else {
        newFollower = await actionFollowUser({
          followerId,
          userId,
          path: pathname,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SubmitButton loading={isLoading} onClick={handleFollow}>
      {userFollow ? "Unfollow" : "Follow"}
    </SubmitButton>
  );
};

export default FollowButton;
