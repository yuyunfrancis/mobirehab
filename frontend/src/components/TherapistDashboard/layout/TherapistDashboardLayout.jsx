import { Outlet } from "react-router-dom";
import Sidebar from "../../common/Sidebar";

const TherapistDashboardLayout = () => {
  const therapistRoutes = [
    { path: "/therapist/profile", name: "Profile" },
    { path: "/therapist/sessions", name: "Sessions" },
    { path: "/therapist/settings", name: "Settings" },
  ];
  return (
    <div className="flex h-screen">
      <Sidebar routes={therapistRoutes} />
      <div className="flex flex-col bg-[#F8F7FC] flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default TherapistDashboardLayout;
