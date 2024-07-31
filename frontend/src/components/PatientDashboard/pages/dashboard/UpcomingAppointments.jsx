import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

const UpcomingAppointments = ({ appointments, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`${
      darkMode ? "bg-gray-800" : "bg-white"
    } rounded-lg shadow-md p-6`}
  >
    <h2 className="text-2xl font-semibold mb-4 flex items-center">
      <FaCalendarAlt className="mr-2 text-blue-500" /> Upcoming Appointments
    </h2>
    {appointments.map((appointment) => (
      <div key={appointment.id} className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="font-semibold text-lg">
          {appointment.doctor} - {appointment.specialty}
        </p>
        <p className="text-gray-600">
          {new Date(appointment.date).toLocaleDateString()} at{" "}
          {appointment.time}
        </p>
      </div>
    ))}
  </motion.div>
);

export default UpcomingAppointments;
