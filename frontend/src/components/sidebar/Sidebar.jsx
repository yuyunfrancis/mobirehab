import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ routes }) => {
  const location = useLocation();

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex-shrink-0 transition-all duration-300 ease-in-out lg:translate-x-0 transform">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5">MobireHab</h1>
        <nav>
          <ul className="space-y-2">
            {routes.map((route, index) => (
              <li key={index}>
                <Link
                  to={route.path}
                  className={`block py-2 px-4 rounded transition duration-200 ${
                    location.pathname === route.path
                      ? "bg-greenPrimary text-white"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
