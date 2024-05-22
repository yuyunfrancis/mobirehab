import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../pages/NotFound";
import TherapistDashboardLayout from "./layout/TherapistDashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";

const TherapistDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<TherapistDashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        {/* <Route path="appointments" element={<AppointmentsPage />} /> */}
        <Route path="settings" element={<ProfilePage />} />{" "}
        {/* Assuming ProfilePage as placeholder for Settings */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default TherapistDashboard;
