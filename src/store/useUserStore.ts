import { User } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
    { name: "user", skipHydration: true }
  )
);

export default useUserStore;
