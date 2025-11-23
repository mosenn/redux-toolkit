"use client";
import React from "react";
import UserLoginForm from "./form";
import ContainerToast from "@/app/components/toast-container/toast";
const UserLoginPage = () => {
  return (
    <div>
      <ContainerToast />

      <UserLoginForm />
    </div>
  );
};

export default UserLoginPage;
