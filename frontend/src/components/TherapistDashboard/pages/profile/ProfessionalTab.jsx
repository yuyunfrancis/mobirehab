import React from "react";

import FileUpload from "./FileUpload";
import Input from "../../../common/forms/Input";

const ProfessionalTab = ({ therapist, handleInputChange }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-gray-800">
      Professional Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        label="Specialization"
        value={therapist.specialization}
        onChange={(e) => handleInputChange("specialization", e.target.value)}
      />
      <Input
        label="License Number"
        value={therapist.licenseNumber}
        onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
      />
      <Input
        label="Years of Experience"
        type="number"
        value={therapist.numOfYearsOfExperience}
        onChange={(e) =>
          handleInputChange("numOfYearsOfExperience", e.target.value)
        }
      />
      <Input
        label="Profession"
        value={therapist.profession}
        onChange={(e) => handleInputChange("profession", e.target.value)}
      />
    </div>
    <FileUpload
      label="Medical License"
      currentFile={therapist.licenseDocument}
    />
    <FileUpload label="CV" currentFile={therapist.cv} />
  </div>
);

export default ProfessionalTab;
