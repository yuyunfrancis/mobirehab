import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PersonalTab from "./PersonalTab";
import ProfessionalTab from "./ProfessionalTab";
import SecurityTab from "./SecurityTab";
import RatingsTab from "./RatingsTab";
import { initialTherapistData } from "./therapistData";
import ProfileSidebar from "./ProfileSidebar";

const ProfilePage = () => {
  const [therapist, setTherapist] = useState(initialTherapistData);
  const [activeTab, setActiveTab] = useState("personal");

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    guardianPhoneNumber: "",
    gender: "Male",
    // dateOfBirth: todayFormatted,
    address: {
      country: "Rwanda",
      city: "",
      district: "",
      street: "",
    },
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    setTherapist((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setTherapist((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (
      name === "country" ||
      name === "city" ||
      name === "district" ||
      name === "street"
    ) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        address: {
          ...prevInputs.address,
          [name]: value,
        },
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };

  const tabContent = {
    personal: (
      <PersonalTab
        therapist={therapist}
        handleInputChange={handleInputChange}
        handleAddressChange={handleAddressChange}
      />
    ),
    professional: (
      <ProfessionalTab
        therapist={therapist}
        handleInputChange={handleInputChange}
      />
    ),
    security: <SecurityTab />,
    ratings: <RatingsTab therapist={therapist} />,
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/4 mb-8 md:mb-0">
            <ProfileSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              therapist={therapist}
            />
          </div>
          <div className="md:w-3/4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
