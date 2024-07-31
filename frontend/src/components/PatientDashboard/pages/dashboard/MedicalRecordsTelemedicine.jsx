import React from "react";
import { motion } from "framer-motion";
import { FaFileMedical, FaVideo } from "react-icons/fa";

const MedicalRecordsTelemedicine = ({ darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`${
      darkMode ? "bg-gray-800" : "bg-white"
    } rounded-lg shadow-md p-6`}
  >
    <h2 className="text-2xl font-semibold mb-4 flex items-center">
      <FaFileMedical className="mr-2 text-indigo-500" /> Medical Records &
      Telemedicine
    </h2>
    <button
      className={`w-full py-3 px-4 rounded-lg ${
        darkMode
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white font-semibold transition duration-300 mb-4`}
    >
      View Full Medical History
    </button>
    <button
      className={`w-full py-3 px-4 rounded-lg ${
        darkMode
          ? "bg-green-600 hover:bg-green-700"
          : "bg-green-500 hover:bg-green-600"
      } text-white font-semibold transition duration-300 flex items-center justify-center`}
    >
      <FaVideo className="mr-2" /> Start Video Consultation
    </button>
  </motion.div>
);

export default MedicalRecordsTelemedicine;
