import DashboardSidebar from "@/app/components/admin-dashboard-sidebar/sidebar";
import HomeListSSR from "@/app/components/home-list-ssr/homse-list-ssr";
import React from "react";

const HouseAdminDash = () => {
  return (
    <main className="flex">
      <DashboardSidebar />
      <HomeListSSR activebtn={true}/>
    </main>
  );
};

export default HouseAdminDash;
