import React from "react";
import { motion } from "framer-motion";
import { FaPills } from "react-icons/fa";

const Medications = ({ medications, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`${
      darkMode ? "bg-gray-800" : "bg-white"
    } rounded-lg shadow-md p-6`}
  >
    <h2 className="text-2xl font-semibold mb-4 flex items-center">
      <FaPills className="mr-2 text-red-500" /> Current Medications
    </h2>
    {medications.map((medication, index) => (
      <div key={index} className="mb-4 p-4 bg-red-50 rounded-lg">
        <p className="font-semibold text-lg">{medication.name}</p>
        <p className="text-gray-600">
          {medication.dosage} - {medication.frequency}
        </p>
      </div>
    ))}
  </motion.div>
);

export default Medications;
