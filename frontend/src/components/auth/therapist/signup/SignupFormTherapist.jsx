import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import ProfessionalInfo from "./ProfessionalInfo";
import RequiredFiles from "./RequiredFiles.";
import ProgressBar from "../../../utilities/ProgressBar";

const SignupFormTherapist = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const steps = [
    {
      title: "Personal Info",
      content: <PersonalInfo formData={formData} handleChange={handleChange} />,
    },
    {
      title: "Professional Info",
      content: (
        <ProfessionalInfo formData={formData} handleChange={handleChange} />
      ),
    },
    {
      title: "Required Files",
      content: (
        <RequiredFiles formData={formData} handleChange={handleChange} />
      ),
    },
  ];

  const nextStep = () => {
    if (currentStep === steps.length) {
      handleFinalSubmission();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleFinalSubmission = () => {
    if (
      window.confirm(
        "Have you reviewed your information and want to proceed with registration?"
      )
    ) {
      console.log(formData);
      alert(
        "Account created successfully. Please check your email for verification."
      );
      setCurrentStep(steps.length + 1);
    }
  };

  return (
    <div className="w-full">
      {currentStep <= steps.length ? (
        <>
          <ProgressBar steps={steps} currentStep={currentStep} />
          {steps[currentStep - 1].content}
          <div className="flex justify-between mt-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded ${
                currentStep === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              className={`px-4 py-2 rounded ${
                currentStep === steps.length
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {currentStep === steps.length ? "Complete Registration" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Account Created Successfully
          </h2>
          <p className="mt-4 text-gray-600">
            Please check your email for the verification link.
          </p>
        </div>
      )}
    </div>
  );
};

export default SignupFormTherapist;
