import React from "react";
import Header from "../../../common/Header";
import SignupFormTherapist from "./SignupFormTherapist";

const TherapistSignup = () => {
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="flex w-full h-full">
        <div className="hidden md:flex w-2/5 h-full bg-hoverColor flex-col justify-center items-center p-4">
          <div className="w-1/2 h-1/2 flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/da0fkowyd/image/upload/v1716320301/Gynecology_consultation-rafiki_d37prc.png"
              alt="Doctor attending to a patient remotely"
              className="max-h-full w-auto"
            />
          </div>
          <p className="text-white px-4 text-center bg-opacity-50 p-2 rounded mt-4">
            MOBIREHAB is a digital healthcare platform to improve accessibility
            and quality of rehabilitation services towards independent life. We
            serve Kigali, and we plan to launch in other parts of Rwanda soon.
          </p>
        </div>
        <div className="w-full md:w-3/5 h-full bg-white flex flex-col items-center md:items-center justify-center overflow-auto">
          <div className="flex-wrap lg:w-3/4 w-full px-8 mt-6 lg:mt-0 lg:px-0 py-6 lg:py-0 overflow-hidden">
            <Header
              heading="Therapist Registration"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/therapist/login"
            />
            <SignupFormTherapist />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistSignup;
