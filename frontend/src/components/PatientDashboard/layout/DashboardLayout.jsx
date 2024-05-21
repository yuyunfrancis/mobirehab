import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col bg-[#F8F7FC] flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
