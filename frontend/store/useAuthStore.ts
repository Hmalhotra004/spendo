import { UserType } from "@/types";
import api from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAxiosError } from "axios";
import { create } from "zustand";

export type result = {
  success: boolean;
  error?: string;
};

interface AuthStore {
  user: UserType | null;
  token: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  login: (email: string, password: string) => Promise<result>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<result>;
  checkAuth: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  login: async (email, password) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        await AsyncStorage.setItem("token", data.token);

        set({
          user: data.user,
          token: data.token,
        });

        return {
          success: true,
        };
      } else {
        return { success: false, error: "Something went wrong!" };
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 404 || error.response?.status === 401) {
          return { success: false, error: error.response?.data.message };
        }
      }
      return { success: false, error: "Something went wrong" };
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (username, email, password) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/auth/register", {
        email,
        password,
        username,
      });

      if (response.status === 200) {
        return { success: true };
      }
      return { success: false, error: "Something went wrong" };
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400 || error.response?.status === 409) {
          return { success: false, error: error.response?.data.message };
        }
      }
      return { success: false, error: "Something went wrong!" };
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ token, user });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
