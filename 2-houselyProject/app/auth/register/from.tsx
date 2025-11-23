"use client";
import React, { useState } from "react";
import { z } from "zod";


const ZodUserRegister = z.object({
  email: z.email("Email Is Not Valid").nonempty(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      { message: "password most have [a-Z,0-9,@$!%*#?&,]" }
    )
    .min(8, "password need to 8 characters")
    .nonempty(),
  username: z.string().nonempty("set username"),
  // pic: z.string().regex(imageUrlRegex, "url is not valid").optional(),
});

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import handleAuthResponse from "@/app/utils/helper/auth-res-option";
import { AxiosError } from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputErrors from "@/app/components/input-erros/input-errors";
import { Eye, EyeSlash } from "iconsax-reactjs";
import SubmitButton from "@/app/components/submit-button/button";
import { useMutation } from "@tanstack/react-query";
import UserRegister from "@/app/lib/api/auth/user-register";

interface User {
  email: string;
  password: string;
  username: string;
}

const UserRegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(ZodUserRegister), mode: "onChange" });



  const mutationRegister = useMutation({
    mutationFn: UserRegister,
    onSuccess: (userData) => {
      console.log(userData);
      //*
    },
    onError: () => {
      console.log("error in mutation useUserLogintMutation");
    },
  });

  const SubmitForm = async (data: User) => {
    try {
      const userData = await mutationRegister.mutateAsync(data);
      if (userData?.statusCode === 201) {
        toast.dark("Your account is created 🎉", {
          style: {
            background: "#1E1E1E",
            color: "#fff",
          },
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else if (userData?.statusCode === 409) {
        toast.error("با این ایمیل قبلا ثبت نام کردید", {
          progressClassName: "custom-progress-bar-error",
        });
      } else {
        toast.error("Unexpected status code: " + userData.statusCode);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(SubmitForm)} className="flex flex-col">
        <input
          id="email"
          {...register("email")}
          type="text"
          className="rounded-lg mx-5 my-5 p-4 outline-none focus:border border-green-400 "
          placeholder="Email"
          aria-label="set your Email"
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
          className="rounded-lg mx-5 my-5 p-4 outline-none focus:border border-green-400"
          {...register("password")}
          placeholder="Password"
          aria-label="set your Password"
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

        <input
          type={showPassword ? "text" : "password"}
          id="username"
          {...register("username")}
          className=" rounded-lg mx-5 my-5 p-4 outline-none focus:border border-green-400"
          placeholder="username"
          aria-label="set username"
        />

        {errors?.username && (
          <InputErrors
            style={"text-red-500"}
            message={errors.username.message as string}
          />
        )}

        <SubmitButton
          loadingBtn={ mutationRegister.isPending}
          text="ثبت نام"
          style=" max-w-[150px] py-[10px] px-[26px] text-[rgb(255,255,255)] font-poppins text-lg m-5 bg-[#276344] rounded-3xl"
        />
      </form>
    </div>
  );
};

export default UserRegisterForm;
