"use client";

import DashboardSidebar from "@/app/components/admin-dashboard-sidebar/sidebar";
import ContainerToast from "@/app/components/toast-container/toast";
import React from "react";

const AdminPanel = () => {
  return (
    <main className="   justify-center w-full">


      <h1 className="">admin-panel</h1>
      <section className="border flex">
        <DashboardSidebar />
        <div>content</div>
      </section>
    </main>
  );
};

export default AdminPanel;
