import React from "react";
import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";

const HealthMetrics = ({ darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`col-span-1 md:col-span-2 lg:col-span-3 ${
      darkMode ? "bg-gray-800" : "bg-white"
    } rounded-lg shadow-md p-6`}
  >
    <h2 className="text-2xl font-semibold mb-4 flex items-center">
      <FaChartLine className="mr-2 text-purple-500" /> Health Metrics
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {["Blood Pressure", "Heart Rate", "Blood Sugar"].map((metric) => (
        <div key={metric} className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">{metric}</h3>
          <div className="h-32 bg-purple-100 rounded-lg flex items-center justify-center">
            Graph Placeholder
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export default HealthMetrics;
