"use client";
import React, { useEffect } from "react";

import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";

const DesktopMenu = () => {
  //* useAuth -> zustand
  // const { user, isLoading, handleLogout } = useAuth();
  // if (isLoading) {
  //   return <p className="text-center p-4">Loading...</p>; // یا spinner دلخواه
  // }
  //* useAuth -> redux-toolkit
  const { user, isLoading, handleLogout, refreshUser } = useAuth();

  //* refresh-page for update user login / logout (برای رفرش شدن صفحه)
  // useEffect(() => {
  //   refreshUser()
  // }, []);

  if (isLoading) return <p>Loading user...</p>;

  return (
    <menu>
      <nav className="border flex items-center justify-between">
        {user?.email ? (
          <div>
            <h1>{user.email}</h1>
            <span className="mx-2">/</span>
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="border w-[20%] text-center text-lg">
            <Link href={"/auth/login"}>login</Link>
            <span className="mx-2">/</span>
            <Link href={"/auth/register"}>register</Link>
          </div>
        )}

        <ul className="flex border w-[80%] justify-evenly p-5 text-lg">
          <li>
            <Link
              href={`${
                user?.role === "ADMIN" ? "dashboard/admin" : "dashboard/user"
              }`}
            >
              dashboard
            </Link>
          </li>
          <li>item-3</li>
          <li>item-4</li>
          <li>item-5</li>
          <li>item-6</li>
          <li>item-7</li>
          <li>item-8</li>
        </ul>
      </nav>
    </menu>
  );
};

export default DesktopMenu;
