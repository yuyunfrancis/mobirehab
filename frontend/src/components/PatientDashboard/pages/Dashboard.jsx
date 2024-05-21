import React, { useState } from "react";
import FormAction from "../../common/forms/FormAction";
import { logout } from "../../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const END_POINT = "patient/logout";
      await logout(END_POINT);
      setLoading(false);
      toast.success("Logged out successfully");
      navigate("/patient/login", { replace: true }); // Use absolute path
    } catch (err) {
      console.error(err);
      setLoading(false); // Ensure loading state is reset on error
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div>
      Dashboard
      <div className="flex flex-grow flex-col justify-center">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard</p>
        <button onClick={handleLogout}>
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
