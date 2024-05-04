import { formatNumber } from "@/src/lib/game";
import { BasicUser, UserProfile } from "@/src/lib/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import EditProfileForm from "./EditProfileForm";

type Props = {
  user: BasicUser;
};
const EditProfile = ({ user }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription className="flex gap-1">
            Cost: <Icons.coin className="size-5" />
            {formatNumber(1_800)}
          </DialogDescription>
        </DialogHeader>

        <EditProfileForm user={user} />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
