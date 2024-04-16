import { getUserById, getUserByUsername } from "@/data/get";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import UserHistorySection from "@/src/components/user/UserHistorySection";
import UserProfileSection from "@/src/components/user/UserProfileSection";
import { notFound } from "next/navigation";

const UserProfilePage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  const userById = await getUserById({ id: userId });
  const userByUsername = await getUserByUsername({ username: userId });
  const user = userById || userByUsername;
  if (!user) return notFound();

  const history = [
    {
      title: "The Weeknd",
    },
    {
      title: "The Weeknd1",
    },
    {
      title: "The Weeknd2",
    },
    {
      title: "The Weeknd3",
    },
    {
      title: "The Weeknd4",
    },
  ];
  return (
    <div className="">
      <div className="px-8">
        <UserProfileSection user={user} />
      </div>
      <UserHistorySection />
    </div>
  );
};

export default UserProfilePage;
