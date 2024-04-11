import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Role } from "../lib/types";

type User = {
  id: string;
  email: string;
  username?: string;
  name: string;
  image?: string;
  role: Role;
};

export type UseUserState = {
  user: User | null;
};

export type UseUserActions = {
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useUserStore = create<UseUserState & UseUserActions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user",
      skipHydration: true,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
