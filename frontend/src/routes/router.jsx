import { Routes, Route } from "react-router-dom";
import PatientLogin from "../components/auth/patient/PatientLogin.jsx";
import TherapistLogin from "../components/auth/therapist/TherapistLogin.jsx";
import PatientSignup from "../components/auth/patient/PatientSignup.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/patient/login"
        element={<PatientLogin key="patient-login" />}
      />
      <Route
        path="/therapist/login"
        element={<TherapistLogin key="therapist-login" />}
      />
      <Route
        path="/patient/signup"
        element={<PatientSignup key="patient-signup" />}
      />
      {/* <Route
        path="/therapist/signup"
        element={<TherapistLogin key="therapist-signup" />}
      /> */}
    </Routes>
  );
};

export default AppRoutes;
