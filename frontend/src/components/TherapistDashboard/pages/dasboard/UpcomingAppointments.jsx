import React, { useContext, useEffect } from "react";
import UpcomingAppointmentCard from "./UpcomingAppointmentCard";
import { UserContext } from "../../../../context/UserContext";
import useDataFetching from "../../../../hooks/useFech";

const UpcomingAppointments = ({ darkMode }) => {
  const appointments = [
    {
      id: 1,
      patient: "John Doe",
      date: "2024-07-30 10:00 AM",
    },
    {
      id: 2,
      patient: "Jane Smith",
      date: "2024-07-30 2:00 PM",
    },
    {
      id: 3,
      patient: "Bob Johnson",
      date: "2024-07-31 11:30 AM",
    },
  ];

  const [loading, error, data, fetchData] = useDataFetching(
    "upcoming-appointments"
  );

  useEffect(() => {
    fetchData();
  }, []);

  //   console.log("====================================");
  //   console.log(data);
  //   console.log("====================================");

  return (
    <div
      className={`rounded-xl shadow-lg p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
      {loading ? (
        <p>Loading Appointments...</p>
      ) : (
        <>
          {data?.data?.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <UpcomingAppointmentCard
                  key={appointment.id}
                  {...appointment}
                  darkMode={darkMode}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No upcoming appointments</p>
          )}
        </>
      )}
    </div>
  );
};

export default UpcomingAppointments;
