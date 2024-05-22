import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ routes }) => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <nav>
        <ul>
          {routes.map((route, index) => (
            <li
              key={index}
              className={location.pathname === route.path ? "active" : ""}
            >
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
