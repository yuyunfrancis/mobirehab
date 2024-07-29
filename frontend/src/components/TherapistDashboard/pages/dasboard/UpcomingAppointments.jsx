import React from "react";
import UpcomingAppointmentCard from "./UpcomingAppointmentCard";

const UpcomingAppointments = ({ darkMode }) => {
  const appointments = [
    {
      id: 1,
      patient: "John Doe",
      date: "2024-07-30 10:00 AM",
      type: "Regular",
    },
    {
      id: 2,
      patient: "Jane Smith",
      date: "2024-07-30 2:00 PM",
      type: "New Patient",
    },
    {
      id: 3,
      patient: "Bob Johnson",
      date: "2024-07-31 11:30 AM",
      type: "Follow-up",
    },
  ];

  return (
    <div
      className={`rounded-xl shadow-lg p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <UpcomingAppointmentCard
            key={appointment.id}
            {...appointment}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
