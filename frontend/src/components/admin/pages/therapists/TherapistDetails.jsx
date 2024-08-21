import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { UserContext } from "../../../../context/UserContext";
import Loading from "../../../utilities/Loading";

const adminBaseLocalURL = "http://localhost:5000/api/admin";
const adminBaseURL = "https://mobirehab.onrender.com/api/admin";

const TherapistDetails = () => {
  const { id } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

  const getTherapist = async () => {
    try {
      const response = await axios.get(`${adminBaseURL}/therapists/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setTherapist(response?.data?.data);
        setLoading(false);
      } else {
        console.error(
          "Failed to fetch therapist: Unexpected response status",
          response.status
        );
      }
    } catch (error) {
      console.error(
        "Error fetching therapist:",
        error.response?.data || error.message
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.token) {
      getTherapist();
    }
  }, [currentUser.token]);

  if (loading) {
    return <Loading />;
  }

  if (!therapist) {
    return <div>No therapist data found</div>;
  }

  console.log("therapist:", therapist);

  return (
    <div className="min-h-screen bg-white p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start mb-12">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={therapist.profilePicture}
            alt={`${therapist.firstName} ${therapist.lastName}`}
            className="h-64 w-64 rounded-full object-cover shadow-lg mb-6 md:mb-0 md:mr-12"
          />
          <div className="text-center md:text-left">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold text-gray-800 mb-2"
            >
              {therapist.firstName} {therapist.lastName}
            </motion.h1>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-indigo-600 mb-2"
            >
              {therapist.profession}
            </motion.p>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-4"
            >
              {therapist.specialization}
            </motion.p>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-x-2"
            >
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {therapist.numOfYearsOfExperience} years experience
              </span>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                License: {therapist.licenseNumber}
              </span>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            About {therapist.firstName}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {therapist.bio}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-indigo-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-600 text-lg">{therapist.email}</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-indigo-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-600 text-lg">
                  {therapist.phoneNumber}
                </span>
              </li>
              {therapist.alternativePhoneNumber && (
                <li className="flex items-center">
                  <svg
                    className="w-6 h-6 text-indigo-500 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-600 text-lg">
                    {therapist.alternativePhoneNumber}
                  </span>
                </li>
              )}
            </ul>
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Documents
            </h3>
            <div className="space-y-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={therapist.licenseDocument}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-indigo-100 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-200 transition duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View License Document
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={therapist.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-indigo-100 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-200 transition duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View CV
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            disabled={therapist.isVerified}
            whileTap={{ scale: 0.95 }}
            className={`py-3 px-8 rounded-lg text-white font-semibold text-lg transition duration-300 ${
              therapist.isVerified
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {therapist.isVerified ? "Verified" : "Verify Therapist"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            {therapist.isVerified ? "Deactivate" : "Disapprove"}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TherapistDetails;
