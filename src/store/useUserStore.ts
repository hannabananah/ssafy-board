import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface UserStore {
  isLogin: boolean;
  user: User | null;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isLogin: false,
  user: null,
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user) => set({ user }),
  logout: () => set({ isLogin: false, user: null }),
}));
