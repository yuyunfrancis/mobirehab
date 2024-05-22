import { Outlet } from "react-router-dom";
import Sidebar from "../../common/Sidebar";

const DashboardLayout = () => {
  const patientRoutes = [
    { path: "/patient/profile", name: "Profile" },
    { path: "/patient/appointments", name: "Appointments" },
    { path: "/patient/settings", name: "Settings" },
  ];
  return (
    <div className="flex h-screen">
      <Sidebar routes={patientRoutes} />
      <div className="flex flex-col bg-[#F8F7FC] flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
