import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "../../pages/NotFound";
import { Appointments } from "./pages/appointment";

const PatientDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="settings" element={<ProfilePage />} />{" "}
        {/* Assuming ProfilePage as placeholder for Settings */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PatientDashboard;
