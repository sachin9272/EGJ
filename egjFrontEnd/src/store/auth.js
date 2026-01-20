import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      currentUser: null,
      token: null,
      isAuthenticated: false,

      // actions
      login: (currentUser, token) =>
        set({ currentUser, token, isAuthenticated: true }),

      logout: () =>
        set({ currentUser: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
