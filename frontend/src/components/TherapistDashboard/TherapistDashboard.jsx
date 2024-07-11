import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../pages/NotFound";
import TherapistDashboardLayout from "./layout/TherapistDashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import SuccessPage from "../auth/therapist/signup/SuccessPage";
import { UserContext } from "../../context/UserContext";
import Availabilities from "./pages/availability/Availabilities";
import CreateAvailability from "./pages/availability/CreateAvailability";
import Appointments from "./pages/appointments/Appointments";

const TherapistDashboard = () => {
  const { currentUser, loading } = React.useContext(UserContext);

  const success = currentUser?.data?.user?.active;

  return (
    <Routes>
      <Route path="/" element={<TherapistDashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="availability">
          <Route index element={<Availabilities />} />
          <Route path="create" element={<CreateAvailability />} />
        </Route>
        <Route path="appointments" element={<Appointments />} />
        <Route path="settings" element={<ProfilePage />} />
      </Route>
      <Route path="/success" element={<SuccessPage success={success} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default TherapistDashboard;
