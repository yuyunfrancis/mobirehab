import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden px-4 py-12">
      <div className="absolute top-0 left-0 w-1/2 h-1/2 max-w-md max-h-md bg-blue-200 rounded-full filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 max-w-md max-h-md bg-green-200 rounded-full filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-8 sm:mb-12">
        Welcome to MOBIREHAB
      </h1>

      <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6 md:space-x-12">
        <div className="group">
          <div className="shadow-xl p-6 sm:p-8 md:p-10 rounded-2xl flex flex-col items-center space-y-4 sm:space-y-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white transform transition-transform duration-300 group-hover:scale-105">
            <h2 className="text-2xl sm:text-3xl font-bold">Patient</h2>
            <Link
              to="/patient/login"
              className="text-xl sm:text-2xl hover:underline transition-colors duration-300 hover:text-blue-100"
            >
              Login
            </Link>
            <Link
              to="/patient/signup"
              className="text-xl sm:text-2xl hover:underline transition-colors duration-300 hover:text-blue-100"
            >
              Signup
            </Link>
          </div>
        </div>
        <div className="group">
          <div className="shadow-xl p-6 sm:p-8 md:p-10 rounded-2xl flex flex-col items-center space-y-4 sm:space-y-6 bg-gradient-to-br from-green-500 to-green-600 text-white transform transition-transform duration-300 group-hover:scale-105">
            <h2 className="text-2xl sm:text-3xl font-bold">Therapist</h2>
            <Link
              to="/therapist/login"
              className="text-xl sm:text-2xl hover:underline transition-colors duration-300 hover:text-green-100"
            >
              Login
            </Link>
            <Link
              to="/therapist/signup"
              className="text-xl sm:text-2xl hover:underline transition-colors duration-300 hover:text-green-100"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-8 sm:mt-12 text-sm sm:text-base text-gray-600 text-center max-w-md">
        Empowering your recovery journey with cutting-edge mobile
        rehabilitation.
      </p>

      <Link
        className="absolute bottom-4 right-4 text-gray-600 hover:text-gray-800"
        to="/admin/login"
      >
        I am an Admin
      </Link>
    </div>
  );
};

export default WelcomePage;
