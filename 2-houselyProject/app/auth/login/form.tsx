"use client";
import InputErrors from "@/app/components/input-erros/input-errors";
import SubmitButton from "@/app/components/submit-button/button";
import UserLoginCallApi from "@/app/lib/api/auth/user-login";
import { ZodUserLogin } from "@/app/lib/validation/ZodUserlogin";
import useUserStore from "@/app/store/useUserStroe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeSlash } from "iconsax-reactjs";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


// کاربر فرم را پر می‌کند.

//  داده‌ها را مدیریت می‌کند register

//می‌دهد   zodResolver فرم را می‌گیرد و داده‌ها را به handleSubmit   .

//  اعتبارسنجی می‌کند. ZodUserLogin داده‌ها را با  zodResolver

// اجرا می شود handleUserLogin اگر همه چیز درست باشد .

// نمایش داده می شوند UI پر می شود و خطاها در  formState.errors  اگر خطا باشد

interface User {
  email: string;
  password: string;
}


interface SuccessResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  message: string;
  statusCode: number;
}

interface ErrorResponse {
  ErrorMessage: { status: number };
  TextMessage: string;
}

type UserResponse = SuccessResponse | ErrorResponse;

const UserLoginForm = () => {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const setLoading = useUserStore((s) => s.setLoading);
  //   const { mutationLogin } = useUserLoginMutation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ZodUserLogin),
    mode: "onChange",
  });

  // const mutationLogin = useMutation<UserResponse, unknown, User>({
  //   mutationFn: UserLoginCallApi,
  //   onSuccess: (userData: UserResponse) => {
  //     console.log("User data:", userData);
  //     if ("data" in userData && userData.data?.data) {
  //       setUser(userData.data.data);
  //       setLoading(false);
  //     }
  //   },
  //   onError: () => {
  //     console.log("error in mutation useUserLoginMutation");
  //   },
  // });

  // const handleUserLogin = async (data: User) => {
  //   try {
  //     const userData = await mutationLogin.mutateAsync(data);

  //     console.log("userData in handleUserLogin", userData);

  //     if ("statusCode" in userData && userData.statusCode === 200) {
  //       toast.dark(`${userData.data.user.email} خوش امدید ✌`, {
  //         style: { background: "#1E1E1E", color: "#fff" },
  //       });
  //       setTimeout(() => router.push("/"), 3000);
  //     } else if ("statusCode" in userData && userData.statusCode === 409) {
  //       toast.error("Conflict", {
  //         progressClassName: "custom-progress-bar-error",
  //       });
  //     } else if ("statusCode" in userData) {
  //       toast.error("Unexpected status code: " + userData.statusCode);
  //     } else {
  //       toast.error(userData.TextMessage || "Unknown error occurred");
  //     }
  //   } catch (error) {
  //     console.log("err login error in hanldeLogin form.tsx", error);
  //     toast.error("An error occurred during login");
  //   }
  // };

  const mutationLogin = useMutation<UserResponse, unknown, User>({
    mutationFn: UserLoginCallApi,
    onSuccess: (userData: UserResponse) => {
      console.log("User data:", userData);

      if ("data" in userData && userData.data?.data) {
        setUser(userData.data.data);
        setLoading(false);
      }

      // کنترل وضعیت بر اساس statusCode
      if ("statusCode" in userData) {
        const { statusCode } = userData;

        if (statusCode === 200) {
          toast.dark(`${userData.data.user.email} خوش آمدید ✌`, {
            style: { background: "#1E1E1E", color: "#fff" },
          });
          setTimeout(() => router.push("/"), 3000);
        } else if (statusCode === 409) {
          toast.error("Conflict", {
            progressClassName: "custom-progress-bar-error",
          });
        } else {
          toast.error("Unexpected status code: " + statusCode);
        }
      } else {
        toast.error(userData.TextMessage || "Unknown error occurred");
      }
    },
    onError: (error) => {
      console.log("error in mutation useUserLoginMutation", error);
      toast.error("An error occurred during login");
    },
  });

  const handleUserLogin = async (data: User) => {
    // فقط این کافی است 👇
    mutationLogin.mutate(data);
  };

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit(handleUserLogin)}
        className="flex flex-col"
      >
        <input
          id="email"
          {...register("email")}
          type="text"
          className="rounded-lg mx-5 my-5 p-4 outline-none focus:border border-green-400 autofill:bg-transparent autofill:text-white"
          placeholder="email"
          aria-label="write your password"
        />
        {errors?.email && (
          <InputErrors
            style={"text-red-500"}
            message={errors.email.message as string}
          />
        )}
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="mx-5 my-5 p-4 rounded-lg  outline-none focus:border border-green-400 "
          {...register("password")}
          placeholder="password"
          aria-label="write your password"
        />
        <button
          className="absolute  top-[127px] right-[30px] lg:right-[100px]"
          type="button"
          title="show/hide password"
          aria-label="button toggel show and hide password"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <Eye size="25" color="white" />
          ) : (
            <EyeSlash size="25" color="white" />
          )}
        </button>
        {errors?.password && (
          <InputErrors
            style={"text-red-500"}
            message={errors.password.message as string}
          />
        )}

        <SubmitButton
          text="وارد شدن"
          style=" max-w-[150px] py-[10px] px-[26px] text-[rgb(255,255,255)] font-poppins text-lg m-5 bg-[#276344] rounded-3xl"
        />
      </form>
    </>
  );
};

export default UserLoginForm;
