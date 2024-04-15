import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UseLayoutState = {
  sideNavOpen: boolean;
};

export type UseLayoutActions = {
  setSideNavOpen: (open: boolean) => void;
  sideNavToggle: () => void;
};

const useLayoutStore = create<UseLayoutState & UseLayoutActions>()(
  persist(
    (set) => ({
      sideNavOpen: false,
      setSideNavOpen: (open) => set({ sideNavOpen: open }),
      sideNavToggle: () =>
        set((state) => ({ sideNavOpen: !state.sideNavOpen })),
    }),
    {
      name: "layout",
      skipHydration: true,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useLayoutStore;
