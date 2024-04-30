import { BasicUser, UserProfile } from "@/src/lib/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "../ui/button";
import EditProfileForm from "./EditProfileForm";

type Props = {
  user: BasicUser;
};
const EditProfile = ({ user }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <EditProfileForm user={user} />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
