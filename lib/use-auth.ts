// src/hooks/use-auth.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "@/lib/api-client";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const res: any = await apiClient.post("/auth/login", credentials);
          // apiClient already returns response.data, so res is { success, message, data: { user, accessToken } }
          const { user, accessToken } = res.data;
          localStorage.setItem("access_token", accessToken);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      register: async (data) => {
        set({ isLoading: true });
        try {
          const res: any = await apiClient.post("/auth/register", data);
          const { user, accessToken } = res.data;
          localStorage.setItem("access_token", accessToken);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      logout: async () => {
        try {
          await apiClient.post("/auth/logout");
        } finally {
          localStorage.removeItem("access_token");
          set({ user: null, isAuthenticated: false });
        }
      },
      checkAuth: async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
          set({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }

        set({ isLoading: true });
        try {
          const res: any = await apiClient.get("/auth/me");
          set({ user: res.data, isAuthenticated: true, isLoading: false });
        } catch (error) {
          localStorage.removeItem("access_token");
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
