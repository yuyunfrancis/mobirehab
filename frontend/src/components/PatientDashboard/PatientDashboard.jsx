import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "../../pages/NotFound";
import { AppointmentDetails, Appointments } from "./pages/appointment";
import TherapistList from "./pages/therapists/TherapistList";
import BookAppointment from "./pages/appointment/BookAppointment";
import AppointmentSuccess from "./pages/appointment/AppointmentSuccess";

const PatientDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="appointments">
          <Route index element={<Appointments />} />
          <Route path=":id" element={<AppointmentDetails />} />
          <Route path="book" element={<BookAppointment />} />
        </Route>
        <Route path="therapist-list" element={<TherapistList />} />
        <Route path="payment-success-page" element={<AppointmentSuccess />} />
        <Route path="settings" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PatientDashboard;
