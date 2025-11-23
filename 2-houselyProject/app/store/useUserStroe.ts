import { create } from "zustand";
import { persist } from "zustand/middleware";
import CallUserLogout from "../lib/api/auth/user-logout";
import CallUserProfile from "../lib/api/auth/user-profile";

interface User {
  id: string;
  password: string;
  confirmPassword: string;
  email: string;
  pic: string;
  username: string | null;
  job: string | null;
  description: string | null;
  location: string | null;
  birthday: string | null;
  role: string;
  createdAt: string;
  iat: number;
  exp: number;
}

interface UserStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  user: User | null;
  setUser: (userData: User) => void;
  fetchUserProfile: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setLoading: (loading) => set({ isLoading: loading }),

      setUser: (userData) => set({ user: userData }),

      fetchUserProfile: async () => {
        try {
          const response = await CallUserProfile();
          console.log("responsein fetchuserProfile store", response);
          set({ user: response, isLoading: false });
        } catch (error) {
          console.log("Error fetching user profile:", error);
          set({ isLoading: false, user: null });
        }
      },

      handleLogout: async () => {
        const res = await CallUserLogout();
        console.log(res, "res in handlelogout");

        if (res.statusCode === 200) {
          console.log("User logged out successfully");
          set({
            user: null,
            isLoading: false,
          });
          localStorage.removeItem("user-storage"); // حذف داده ذخیره‌شده
        }
      },
    }),
    {
      name: "user-storage", // اسم کلید localStorage
      partialize: (state) => ({ user: state.user }), // فقط user ذخیره شود
    }
  )
);

export default useUserStore;
