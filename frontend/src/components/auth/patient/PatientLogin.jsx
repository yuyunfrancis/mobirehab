import React from "react";
import { Carousel } from "react-responsive-carousel";

import Header from "../../common/Header";
import LoginForm from "./LoginForm";

const PatientLogin = () => {
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="w-full md:w-1/2 h-full bg-green-500 md:flex hidden flex-col justify-center items-center p-4">
          <img
            src="path-to-your-image.jpg"
            alt="Doctor attending to a patient remotely"
            className="max-h-1/3 w-auto"
          />
          <p className="text-white text-center bg-opacity-50 bg-black p-2 rounded mt-4">
            Your beautiful message here
          </p>
        </div>
        <div className="w-full md:w-1/2 h-full bg-white flex items-center justify-center">
          <div className="flex-wrap w-3/4">
            <Header
              heading="Welcome Back. Login into your account and talk to a therapist now"
              paragraph="Don't have an account yet? "
              linkName="Signup"
              linkUrl="/patient/signup"
            />
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
