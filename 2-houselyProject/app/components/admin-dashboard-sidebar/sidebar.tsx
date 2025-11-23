"use client";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const DashboardSidebar = () => {
  const { user, handleLogout } = useAuth();
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState(false);

  // وقتی کامپوننت mount شد، auth را بررسی می‌کنیم
  useEffect(() => {
    setAuthChecked(true);
  }, []);

  const logoutAndRedirect = () => {
    handleLogout();
    router.push("/"); // ریدایرکت بعد از logout
  };

  // فقط وقتی user null و authChecked true است، ریدایرکت می‌کنیم
  useEffect(() => {
    if (authChecked && user === null) {
      router.push("/");
    }
  }, [authChecked, user, router]);

  if (!authChecked) {
    return null; // یا spinner/loading component
  }

  return (
    <aside className="border w-[15%] h-screen relative">
      <nav>
        <ul className=" [&>li]:border-b [&>li]:border-gray-200 [&>li]:p-2 [&>li]:w-full text-center text-lg">
          <li>
            <div className="my-5 flex justify-evenly">
              <Link href={"/dashboard/admin"}>dashboard</Link>
              <span>icon</span>
            </div>
          </li>
          <li>
            <div className="my-5 flex justify-evenly">
              <Link href={"/dashboard/admin/create-house"}>create</Link>
              <span>icon</span>
            </div>
          </li>
          <li>
            <div className="my-5 flex justify-evenly">
              <Link href={"/dashboard/admin/houses"}>houses</Link>
              <span>icon</span>
            </div>
          </li>
          <li>
            <div className="my-5 flex justify-evenly">
              <Link href={"/"}>users</Link>
              <span>icon</span>
            </div>
          </li>
          <li>
            <div className="my-5 flex justify-evenly">
              <Link href={"/"}>tickets</Link>
              <span>icon</span>
            </div>
          </li>
          <li>
            <div className="my-5 flex justify-evenly">
              <Link href={"/"}>setting</Link>
              <span>icon</span>
            </div>
          </li>
        </ul>
      </nav>
      <section className="absolute my-5 bottom-0 mx-5">
        <div className="flex">
          <p>{user?.email}</p>
          <span className="mx-2">/</span>
          <button onClick={logoutAndRedirect}>logout</button>
        </div>
      </section>
    </aside>
  );
};

export default DashboardSidebar;
