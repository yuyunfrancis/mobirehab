import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PatientLogin from "../components/auth/patient/PatientLogin";
import TherapistLogin from "../components/auth/therapist/TherapistLogin";
// import AdminLogin from "../components/auth/admin/AdminLogin"
import PatientDashboard from "../components/PatientDashboard/PatientDashboard";
import PrivateRoutes from "./PrivateRoutes";
import RedirectToDashboard from "./RedirectToDashboard";
import NotAuthorized from "../pages/NotAuthorized";
import NotFound from "../pages/NotFound";
import PatientSignup from "../components/auth/patient/PatientSignup";
import TherapistDashboard from "../components/TherapistDashboard/TherapistDashboard";
import TherapistSignup from "../components/auth/therapist/signup/TherapistSignup";
import Loading from "../components/utilities/Loading";
import ForgotPassword from "../components/PatientDashboard/pages/ForgotPassword";
import ResetPassword from "../components/PatientDashboard/pages/ResetPassword";
import AccountStatus from "../components/TherapistDashboard/pages/AccountStatus";
import AdminDashboardRoute from "../components/admin/AdminDashboardRoute";
import AdminLogin from "../components/admin/auth/AdminLogin";
import WelcomePage from "../pages/WelcomePage";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<RedirectToDashboard />} />
        <Route
          path="/patient/login"
          element={<PatientLogin END_POINT="patient/login" />}
        />
        <Route
          path="/patient/signup"
          element={<PatientSignup END_POINT="patient/signup" />}
        />
        <Route
          path="/admin/login"
          element={<AdminLogin END_POINT="admin/login" />}
        />
        <Route
          path="/therapist/login"
          element={<TherapistLogin END_POINT="therapist/login" />}
        />
        <Route
          path="/therapist/signup"
          element={<TherapistSignup END_POINT="therapist/signup" />}
        />
        <Route
          element={
            <PrivateRoutes allowedRoles={["patient", "therapist", "admin"]} />
          }
        >
          <Route path="/patient/*" element={<PatientDashboard />} />
          <Route path="/therapist/*" element={<TherapistDashboard />} />
          <Route path="/admin/*" element={<AdminDashboardRoute />} />
        </Route>
        <Route path="/therapist/account-status" element={<AccountStatus />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/patient/forgot-password" element={<ForgotPassword />} />
        <Route path="/patient/reset-password" element={<ResetPassword />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
