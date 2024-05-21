import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const RedirectToDashboard = () => {
  const { currentUser, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        navigate("/patient/login", { replace: true });
      } else {
        switch (currentUser.data.user.userType) {
          case "patient":
            navigate("/patient/", { replace: true });
            break;
          case "therapist":
            navigate("/therapist/dashboard", { replace: true });
            break;
          case "admin":
            navigate("/admin/dashboard", { replace: true });
            break;
          default:
            navigate("/patient/login", { replace: true });
        }
      }
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return null;
};

export default RedirectToDashboard;
