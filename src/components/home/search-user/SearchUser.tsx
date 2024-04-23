"use client";

import * as React from "react";

import { Button } from "@components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { useMediaQuery } from "@mantine/hooks";
import { actionSearchUser } from "@/src/actions/get";
import { BasicUser } from "@/src/lib/types";
import { useRouter } from "next/navigation";
import UserProfileSection from "../../user/UserProfileSection";

const defaultUserList: BasicUser[] = [];

const SearchUser = () => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [selectedUser, setSelectedUser] = React.useState<BasicUser | null>(
    null
  );
  const [userList, setUserList] = React.useState<BasicUser[]>(defaultUserList);

  const fetchUserList = async (search: string) => {
    if (search.length < 2) return;
    try {
      const { data: userList } = await actionSearchUser({ search });
      if (userList) {
        console.log(userList);
        setUserList(userList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const timeoutId = React.useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (input: string) => {
    setSearch(input);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      fetchUserList(input);
    }, 500); // 1 second delay
  };

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="lg" className="justify-end">
            {selectedUser ? <>{selectedUser.name}</> : <>Search </>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            search={search}
            setSearch={setSearch}
            setOpen={setOpen}
            setSelectedUser={setSelectedUser}
            userList={userList}
            handleInputChange={handleInputChange}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedUser ? <>{selectedUser.name}</> : <>Search</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            search={search}
            setSearch={setSearch}
            setOpen={setOpen}
            setSelectedUser={setSelectedUser}
            userList={userList}
            handleInputChange={handleInputChange}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

function StatusList({
  userList,
  setOpen,
  setSelectedUser,
  search,
  setSearch,
  handleInputChange,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setOpen: (open: boolean) => void;
  setSelectedUser: (status: BasicUser | null) => void;
  userList: BasicUser[];
  handleInputChange: (input: string) => void;
}) {
  const router = useRouter();
  return (
    <Command>
      <CommandInput
        value={search}
        onChangeCapture={(e) => {
          const value = e.currentTarget.value;
          setSearch(value);
          handleInputChange(value);
          return value;
        }}
        placeholder="Find users..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {userList.map((user) => (
            <CommandItem
              key={user.id}
              value={`${user.username}`}
              onSelect={(value) => {
                setSelectedUser(
                  userList.find((user) => user.username === value) || null
                );
                setOpen(false);
                router.push(`/user/${value}`);
              }}
            >
              {<UserProfileSection user={user} />}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default SearchUser;
