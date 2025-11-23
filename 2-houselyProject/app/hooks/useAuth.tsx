"use client";
// import useUserStore from "../store/useUserStroe";
//* zustand
// const useAuth = () => {
//   const user = useUserStore((state) => state.user);
//   const isLoading = useUserStore((state) => state.isLoading);
//   const handleLogout = useUserStore((state) => state.handleLogout);
//   console.log("user in useAuth", user);
//   return { handleLogout, user, isLoading };
// };
// export default useAuth;

//* redux-toolkit

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useFetchUserProfileQuery,
  useLogoutUserMutation,
  userApi,
} from "../store/userApi";
import { setUser, clearUser } from "../store/userSlice";
import type { RootState } from "../store/store";

const useAuth = () => {
  const dispatch = useDispatch();

  //* استفاده می کنیم  Query - RTK QUERY  زمانی که از
  //* اطلاعات زیر می تونیم داشته باشیم

  //*   data,        // (مثل user)  API برگشت اطلاعات  و دیتای مروبط به
  //*   error,       // خطا ( fail اگه درخواست  بشه )
  //*   isLoading,   // true تا وقتی درخواست در حال انجامه
  //*   refetch,     // تابعی برای دوباره اجرا کردن درخواست همون رفرش کردن صفحه
  //*   isFetching,  // true اگه در حال refetch باشه

  const {
    data: fetchedUser,
    error,
    isLoading,
    refetch,
  } = useFetchUserProfileQuery();

  //* استفاده می کنیم  mutation - RTK QUERY  زمانی که از
  //* اطلاعات زیر می تونیم داشته باشیم
  //*const [logoutUser, { data, error, isLoading, isSuccess }] = useLogoutUserMutation();
  //* logoutUser -> function ساخته شده userApi   مربوط به لاگ اوت کردن کاربر که درون

  const [logoutUser, { isLoading: isLogoutLoading }] = useLogoutUserMutation();

  // کاربر ذخیره‌شده در استور (persist شده)
  const storedUser = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (fetchedUser) {
      dispatch(setUser(fetchedUser));
    }
  }, [fetchedUser, dispatch]);

  const handleLogout = async () => {
    try {
      //* باعث میشه اگر در خواست موفق بود داده رو بده
      //* ( کار کنه try / catch ) کنه مثل  throw اگر شکست خورد
      await logoutUser().unwrap();
      dispatch(clearUser());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  //* برای رفرش کردن صفحه
  // const refreshUser = async () => {
  //   await refetch();
  // };

  return {
    user: storedUser,
    isLoading: isLoading || isLogoutLoading,
    error,
    handleLogout,
    // refreshUser, -> برای رفرش شدن صفحه
  };
};
export default useAuth;
