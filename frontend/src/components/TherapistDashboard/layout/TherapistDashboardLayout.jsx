import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../sidebar/Sidebar";
import { therapistRoutes } from "../../../constants/routes";
import Header from "../../Header";

const TherapistDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`lg:block ${
          sidebarOpen ? "block" : "hidden"
        } fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-800 lg:translate-x-0 lg:static lg:inset-0`}
      >
        <Sidebar routes={therapistRoutes} />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TherapistDashboardLayout;
