import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "../../pages/NotFound";
import { Appointments } from "./pages/appointment";
import TherapistList from "./pages/therapists/TherapistList";
import BookAppointment from "./pages/appointment/BookAppointment";
import AppointmentSuccess from "./pages/appointment/AppointmentSuccess";

const PatientDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="therapist-list" element={<TherapistList />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="payment-success-page" element={<AppointmentSuccess />} />
        <Route path="settings" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PatientDashboard;
