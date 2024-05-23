import React from "react";
import Input from "../../../common/forms/Input";

const ProfessionalInfo = ({ formData, handleChange }) => {
  const inputs = formData;

  return (
    <>
      <div className="flex flex-wrap -mx-3 mb-0 lg:mb-4">
        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <Input
            handleChange={handleChange}
            value={inputs.education}
            labelText="Education"
            labelFor="education"
            id="education"
            name="education"
            type="text"
            isRequired={true}
            placeholder="Your highest degree"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <Input
            handleChange={handleChange}
            value={inputs.experience}
            labelText="Experience"
            labelFor="experience"
            id="experience"
            name="experience"
            type="text"
            isRequired={true}
            placeholder="Years of experience"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-0 lg:mb-4">
        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <Input
            handleChange={handleChange}
            value={inputs.specialization}
            labelText="Specialization"
            labelFor="specialization"
            id="specialization"
            name="specialization"
            type="text"
            isRequired={true}
            placeholder="Your area of expertise"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <Input
            handleChange={handleChange}
            value={inputs.licenseNumber}
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
            value={inputs.clinicName}
            labelText="Clinic Name"
            labelFor="clinicName"
            id="clinicName"
            name="clinicName"
            type="text"
            isRequired={false}
            placeholder="Name of the clinic you work at (if any)"
          />
        </div>
      </div>
    </>
  );
};

export default ProfessionalInfo;
