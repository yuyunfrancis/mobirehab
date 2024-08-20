import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import AdminAccount from "./pages/account/AdminAccount";
import MainDashboard from "./pages/dashboard/MainDashboard";

const AdminDashboardRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<MainDashboard />} />
        <Route path="profile" element={<AdminAccount />} />
      </Route>
    </Routes>
  );
};

export default AdminDashboardRoute;
