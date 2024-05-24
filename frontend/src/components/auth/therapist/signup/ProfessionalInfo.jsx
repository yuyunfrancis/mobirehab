import React from "react";
import Input from "../../../common/forms/Input";

const ProfessionalInfo = ({ formData, handleChange }) => {
  return (
    <>
      <div className="flex flex-wrap -mx-3 mb-0 lg:mb-4">
        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <Input
            handleChange={handleChange}
            value={formData.profession}
            labelText="Current Profession / Specialization"
            labelFor="profession"
            id="profession"
            name="profession"
            type="profession"
            isRequired={true}
            placeholder="Your current role or specialization"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <Input
            handleChange={handleChange}
            value={formData.numOfYearsOfExperience}
            labelText="Years of Experience"
            labelFor="numOfYearsOfExperience"
            id="numOfYearsOfExperience"
            name="numOfYearsOfExperience"
            type="text"
            isRequired={true}
            placeholder="10"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-0 lg:mb-4">
        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <Input
            handleChange={handleChange}
            value={formData.currentWorkplace}
            labelText="currentWorkplace"
            labelFor="currentWorkplace"
            id="currentWorkplace"
            name="currentWorkplace"
            type="text"
            isRequired={true}
            placeholder="Your current place of work"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <Input
            handleChange={handleChange}
            value={formData.licenseNumber}
            labelText="Professional License Number"
            labelFor="licenseNumber"
            id="licenseNumber"
            name="licenseNumber"
            type="text"
            isRequired={true}
            placeholder="Your license number"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-0 lg:mb-4">
        <div className="w-full px-3 mb-4 md:mb-0">
          <Input
            handleChange={handleChange}
            value={formData.bio}
            labelText="Professional Bio"
            labelFor="bio"
            id="bio"
            name="bio"
            isRequired={true}
            placeholder="Tell us about yourself and your professional experience."
            component="textarea"
          />
        </div>
      </div>
    </>
  );
};

export default ProfessionalInfo;
