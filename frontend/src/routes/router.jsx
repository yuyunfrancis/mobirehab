import { Routes, Route } from "react-router-dom";
import PatientLogin from "../components/auth/patient/PatientLogin";
import TherapistLogin from "../components/auth/therapist/TherapistLogin";
// import AdminLogin from "../components/auth/admin/AdminLogin";
import PatientDashboard from "../components/PatientDashboard/PatientDashboard";
// import NotAuthorized from "../components/NotAuthorized";
// import NotFound from "../components/NotFound"; // Assuming you have a NotFound component
import PrivateRoutes from "./PrivateRoutes";
import RedirectToDashboard from "./RedirectToDashboard";
import NotAuthorized from "../pages/NotAuthorized";
import NotFound from "../pages/NotFound";
import PatientSignup from "../components/auth/patient/PatientSignup";
import TherapistDashboard from "../components/TherapistDashboard/TherapistDashboard";
import TherapistSignup from "../components/auth/therapist/signup/TherapistSignup";
import SuccessPage from "../components/auth/therapist/signup/SuccessPage";

const AppRoutes = () => {
  return (
    <Routes>
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
        path="/therapist/login"
        element={<TherapistLogin END_POINT="therapist/login" />}
      />
      <Route
        path="/therapist/signup"
        element={<TherapistSignup END_POINT="therapist/signup" />}
      />
      <Route path="/therapist/success" element={<SuccessPage />} />
      <Route
        path="/patient/*"
        element={<PrivateRoutes allowedRoles={["patient"]} />}
      >
        <Route path="*" element={<PatientDashboard />} />
      </Route>

      <Route
        path="/therapist/*"
        element={<PrivateRoutes allowedRoles={["therapist"]} />}
      >
        <Route path="*" element={<TherapistDashboard />} />
      </Route>

      {/* <Route
        path="/admin/*"
        element={<PrivateRoutes allowedRoles={["admin"]} />}
      >
        <Route path="*" element={<AdminDashboard />} />
      </Route> */}

      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
