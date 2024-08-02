import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaNotesMedical, FaLock } from "react-icons/fa";
import PersonalInfoTab from "./PersonalInfoTab";
import MedicalInfoTab from "./MedicalInfoTab";
import SecurityTab from "./SecurityTab";
import Button from "../../../common/Button";

const PatientProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [patient, setPatient] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    address: "123 Main St, City, Country",
    emergencyContact: "Jane Doe: 987-654-3210",
    profilePicture: "https://example.com/profile-picture.jpg",
    medicalHistory: [
      { condition: "Asthma", diagnosedDate: "2010-05-15" },
      { condition: "Hypertension", diagnosedDate: "2018-11-20" },
    ],
    vitals: [
      { type: "Weight", value: "70", unit: "kg" },
      { type: "Height", value: "175", unit: "cm" },
      { type: "Blood Type", value: "A+", unit: "" },
    ],
    medications: [
      { name: "Albuterol", dosage: "2 puffs", frequency: "As needed" },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
    ],
  });

  const tabContent = {
    personal: <PersonalInfoTab patient={patient} setPatient={setPatient} />,
    medical: <MedicalInfoTab patient={patient} setPatient={setPatient} />,
    security: <SecurityTab />,
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-lg overflow-hidden"
      >
        <div className="flex flex-wrap border-b bg-greenPrimary">
          {[
            { name: "personal", icon: <FaUser /> },
            { name: "medical", icon: <FaNotesMedical /> },
            { name: "security", icon: <FaLock /> },
          ].map((tab) => (
            <motion.button
              key={tab.name}
              className={`flex-1 py-4 px-6 text-center font-medium flex items-center justify-center ${
                activeTab === tab.name
                  ? "bg-white text-greenPrimary"
                  : "text-white hover:bg-greenHover"
              }`}
              onClick={() => setActiveTab(tab.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              <span className="ml-2">
                {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
              </span>
            </motion.button>
          ))}
        </div>
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t">
          <Button
            label="Save Changes"
            onClick={() => {
              /* Save changes logic */
            }}
            icon={<FaUser className="mr-2" />}
            className="text-lg font-semibold"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default PatientProfilePage;
