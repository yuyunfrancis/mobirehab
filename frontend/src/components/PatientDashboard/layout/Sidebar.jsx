import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li
            className={location.pathname === "/patient/profile" ? "active" : ""}
          >
            <Link to="/patient/profile">Profile</Link>
          </li>
          <li
            className={
              location.pathname === "/patient/appointments" ? "active" : ""
            }
          >
            <Link to="/patient/appointments">Appointments</Link>
          </li>
          <li
            className={
              location.pathname === "/patient/settings" ? "active" : ""
            }
          >
            <Link to="/patient/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
