import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-200 rounded-full filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>

      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-12">
        Welcome to MOBIREHAB
      </h1>

      <div className="flex space-x-12">
        <div className="group">
          <div className="shadow-xl p-10 rounded-2xl flex flex-col items-center space-y-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white transform transition-transform duration-300 group-hover:scale-105">
            <h2 className="text-3xl font-bold">Patient</h2>
            <Link
              to="/patient/login"
              className="text-2xl hover:underline transition-colors duration-300 hover:text-blue-100"
            >
              Login
            </Link>
            <Link
              to="/patient/signup"
              className="text-2xl hover:underline transition-colors duration-300 hover:text-blue-100"
            >
              Signup
            </Link>
          </div>
        </div>
        <div className="group">
          <div className="shadow-xl p-10 rounded-2xl flex flex-col items-center space-y-6 bg-gradient-to-br from-green-500 to-green-600 text-white transform transition-transform duration-300 group-hover:scale-105">
            <h2 className="text-3xl font-bold">Therapist</h2>
            <Link
              to="/therapist/login"
              className="text-2xl hover:underline transition-colors duration-300 hover:text-green-100"
            >
              Login
            </Link>
            <Link
              to="/therapist/signup"
              className="text-2xl hover:underline transition-colors duration-300 hover:text-green-100"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-12 text-gray-600 text-center">
        Empowering your recovery journey with cutting-edge mobile
        rehabilitation.
      </p>
    </div>
  );
};

export default WelcomePage;
