import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { UserHistoryCard } from "./UserHistoryCard";

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
];

type Props = {};
const UserHistorySection = ({}: Props) => {
  return (
    <div className="">
      <div className="mt-6 space-y-2 px-8">
        <h2 className="text-xl font-semibold tracking-tight">History</h2>
        <p className="text-sm text-muted-foreground">
          Here&apos;s your game history. It includes all the games you&apos;ve
          played recently.
        </p>
        <Separator className="" />
      </div>
      <div className="relative mt-4">
        <ScrollArea className=" w-[100vw]">
          <div className="flex space-x-4 px-8 pb-4">
            {history.map((album) => (
              <UserHistoryCard
                key={album.title}
                className="w-[250px]"
                aspectRatio="portrait"
                width={250}
                height={330}
              />
            ))}
          </div>
          <ScrollBar className="px-8" orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default UserHistorySection;
