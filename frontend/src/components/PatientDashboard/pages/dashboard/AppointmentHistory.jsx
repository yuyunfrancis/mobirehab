import React from "react";
import { motion } from "framer-motion";
import { FaHistory } from "react-icons/fa";

const AppointmentHistory = ({ appointments, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`${
      darkMode ? "bg-gray-800" : "bg-white"
    } rounded-lg shadow-md p-6`}
  >
    <h2 className="text-2xl font-semibold mb-4 flex items-center">
      <FaHistory className="mr-2 text-green-500" /> Appointment History
    </h2>
    {appointments.map((appointment) => (
      <div key={appointment.id} className="mb-4 p-4 bg-green-50 rounded-lg">
        <p className="font-semibold text-lg">
          {appointment.doctor} - {appointment.specialty}
        </p>
        <p className="text-gray-600">
          {new Date(appointment.date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 mt-2">{appointment.notes}</p>
      </div>
    ))}
  </motion.div>
);

export default AppointmentHistory;
