import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PersonalTab from "./PersonalTab";
import ProfessionalTab from "./ProfessionalTab";
import SecurityTab from "./SecurityTab";
import RatingsTab from "./RatingsTab";
import { initialTherapistData } from "./therapistData";
import ProfileSidebar from "./ProfileSidebar";
import { UserContext } from "../../../../context/UserContext";
import Loading from "../../../utilities/Loading";
import toast from "react-hot-toast";
import api from "../../../../utils/api";
import useDataFetching from "../../../../hooks/useFech";

const ProfilePage = () => {
  const [therapist, setTherapist] = useState(initialTherapistData);
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  const [loading, error, therapistData, refetchTherapistData] =
    useDataFetching("/therapist/profile");

  useEffect(() => {
    if (therapistData && therapistData?.therapist) {
      setFormData((prevData) => ({
        ...prevData,
        ...therapistData?.therapist,
        address: {
          ...prevData?.address,
          ...therapistData?.therapist?.address,
        },
      }));
    }
  }, [therapistData]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    alternativePhoneNumber: "",
    gender: "",
    address: {
      country: "",
      city: "",
      district: "",
      street: "",
    },
    profession: "",
    bio: "",
    numOfYearsOfExperience: "",
    licenseNumber: "",
    specialization: "Physiotherapist",
    licenseDocument: null,
    cv: null,
    profilePicture: null,
    password: "",
    confirmPassword: "",
  });

  // useEffect(() => {
  //   if (therapistData && !loading) {
  //     setFormData({
  //       firstName: therapistData?.therapist?.firstName || "",
  //       lastName: therapistData?.therapist?.lastName || "",
  //       email: therapistData?.therapist?.email || "",
  //       phoneNumber: therapistData?.therapist?.phoneNumber || "",
  //       alternativePhoneNumber:
  //         therapistData?.therapist?.alternativePhoneNumber || "",
  //       gender: therapistData?.therapist?.gender || "",
  //       address: {
  //         country: therapistData?.therapist?.address?.country || "",
  //         city: therapistData?.therapist?.address?.city || "",
  //         district: therapistData?.therapist?.address?.district || "",
  //         street: therapistData?.therapist?.address?.street || "",
  //       },
  //       profession: therapistData?.therapist?.profession || "",
  //       bio: therapistData?.therapist?.bio || "",
  //       numOfYearsOfExperience: therapistData.numOfYearsOfExperience || "",
  //       licenseNumber: therapistData.licenseNumber || "",
  //       specialization: therapistData.specialization || "Physiotherapist",
  //       licenseDocument: therapistData.licenseDocument || null,
  //       cv: therapistData.cv || null,
  //       profilePicture: therapistData.profilePicture || null,
  //     });
  //   }
  // }, [therapistData, loading]);

  const handleInputChange = (field, value) => {
    setTherapist((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setTherapist((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (
      name === "country" ||
      name === "city" ||
      name === "district" ||
      name === "street"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      // For other input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };

  // update therapist personal info
  const updatePersonalInfo = async () => {
    try {
      setIsLoading(true);
      const response = await api.patch("/therapist/profile", formData, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data && response.data.therapist) {
        toast.success("Profile updated successfully");

        // Update the local state with the new data
        setFormData((prevData) => ({
          ...prevData,
          ...response.data.therapist,
          address: {
            ...prevData.address,
            ...response.data.therapist.address,
          },
        }));

        // Refetch the data to ensure consistency
        refetchTherapistData();
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const tabContent = {
    personal: (
      <>
        {loading ? (
          <Loading />
        ) : (
          <PersonalTab
            formData={formData}
            handleChange={handleChange}
            handleSubmit={updatePersonalInfo}
            updating={isLoading}
          />
        )}
      </>
    ),
    professional: (
      <ProfessionalTab
        therapist={formData}
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
