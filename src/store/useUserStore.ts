import { create } from "zustand";

interface UserStore {
  isLogin: boolean;
  user: {
    userid: string;
    username: string;
  } | null;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (
    userData: {
      userid: string;
      username: string;
    } | null
  ) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isLogin: false,
  user: null,
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (userData) => set({ user: userData, isLogin: true }),
}));
