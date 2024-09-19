import React, { useEffect, useState } from "react";
import {
  FaNotesMedical,
  FaWeight,
  FaPills,
  FaUpload,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import Input from "../../../common/forms/Input";
import Button from "../../../common/Button";
import FileUpload from "../../../common/forms/FileUpload";
import api from "../../../../utils/api";
import Loading from "../../../utilities/Loading";
import { formatDate } from "../../../../utils/dateFormater";

const MedicalInfoTab = () => {
  const [patient, setPatient] = useState([]);
  // const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(patient.profilePicture);
  const [onUpdate, setOnUpdate] = useState(false);

  const getPatientData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/patient/profile`);
      setPatient(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);

  console.log("Patient Data:", patient);

  const handleVitalChange = (index, field, value) => {
    const updatedVitals = [...patient.vitals];
    updatedVitals[index][field] = value;
    setPatient({ ...patient, vitals: updatedVitals });
  };

  const addVital = () => {
    setPatient({
      ...patient,
      vitals: [...patient.vitals, { type: "", value: "", unit: "" }],
    });
  };

  const removeVital = (index) => {
    const updatedVitals = patient.vitals.filter((_, i) => i !== index);
    setPatient({ ...patient, vitals: updatedVitals });
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...patient.medications];
    updatedMedications[index][field] = value;
    setPatient({ ...patient, medications: updatedMedications });
  };

  const addMedication = () => {
    setPatient({
      ...patient,
      medications: [
        ...patient.medications,
        { name: "", dosage: "", frequency: "" },
      ],
    });
  };

  const removeMedication = (index) => {
    const updatedMedications = patient.medications.filter(
      (_, i) => i !== index
    );
    setPatient({ ...patient, medications: updatedMedications });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-greenPrimary flex items-center">
          <FaNotesMedical className="mr-2" /> Medical History
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          {patient?.medicalHistory?.map((condition, index) => (
            <li key={index} className="text-gray-700">
              <span className="font-medium">{condition?.condition}</span>{" "}
              (Diagnosed: {formatDate(condition?.diagnosedDate)})
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-greenPrimary flex items-center">
          <FaWeight className="mr-2" /> Vitals
        </h3>
        {patient?.vitals?.map((vital, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              handleChange={(e) =>
                handleVitalChange(index, "type", e.target.value)
              }
              value={vital.type}
              placeholder="Type"
              customClass="w-1/3"
            />
            <Input
              handleChange={(e) =>
                handleVitalChange(index, "value", e.target.value)
              }
              value={vital.value}
              placeholder="Value"
              customClass="w-1/3"
            />
            <Input
              handleChange={(e) =>
                handleVitalChange(index, "unit", e.target.value)
              }
              value={vital.unit}
              placeholder="Unit"
              customClass="w-1/4"
            />
            <Button
              label=""
              onClick={() => removeVital(index)}
              icon={<FaTrash />}
              variant="outlined"
              color="red-600"
              className="w-auto"
            />
          </div>
        ))}
        <Button
          label="Add Vital"
          onClick={addVital}
          icon={<FaWeight className="mr-2" />}
          className="mt-2"
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-greenPrimary flex items-center">
          <FaPills className="mr-2" /> Current Medications
        </h3>
        {patient?.medications?.map((medication, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              handleChange={(e) =>
                handleMedicationChange(index, "name", e.target.value)
              }
              value={medication?.name}
              placeholder="Name"
              customClass="w-1/3"
            />
            <Input
              handleChange={(e) =>
                handleMedicationChange(index, "dosage", e.target.value)
              }
              value={medication?.dosage}
              placeholder="Dosage"
              customClass="w-1/3"
            />
            <Input
              handleChange={(e) =>
                handleMedicationChange(index, "frequency", e.target.value)
              }
              value={medication?.frequency}
              placeholder="Frequency"
              customClass="w-1/4"
            />
            <Button
              label=""
              onClick={() => removeMedication(index)}
              icon={<FaTrash />}
              variant="outlined"
              color="red-600"
              className="w-auto"
            />
          </div>
        ))}
        <Button
          label="Add Medication"
          onClick={addMedication}
          icon={<FaPills className="mr-2" />}
          className="mt-2"
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-greenPrimary flex items-center">
          <FaUpload className="mr-2" /> Prescription Upload
        </h3>
        <FileUpload
          handleChange={(e) => {
            /* Handle file upload */
          }}
          id="prescription"
          name="prescription"
          labelText="Upload Prescription"
        />
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t">
        <Button
          label={onUpdate ? "Updating..." : "Update Profile"}
          disabled={onUpdate}
          onClick={() => {
            // save ();
          }}
          icon={<FaUser className="mr-2" />}
          className="text-lg font-semibold"
        />
      </div>
    </div>
  );
};

export default MedicalInfoTab;
