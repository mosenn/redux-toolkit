import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CallUserLogout from "../lib/api/auth/user-logout";
import CallUserProfile from "../lib/api/auth/user-profile";
import { apiBaseUrl } from "../lib/utils/api-base-url";

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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    credentials: "include", // اگه با کوکی کار می‌کنی
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    fetchUserProfile: builder.query<User, void>({
      query: () => ({
        url: "/auth/profile", // ← endpoint واقعی
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    logoutUser: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});


//  هوک‌های آماده برای استفاده در کامپوننت
export const { useFetchUserProfileQuery, useLogoutUserMutation } = userApi;
