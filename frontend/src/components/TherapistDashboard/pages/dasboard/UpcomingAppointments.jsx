import React, { useContext, useEffect } from "react";
import UpcomingAppointmentCard from "./UpcomingAppointmentCard";
import { UserContext } from "../../../../context/UserContext";
import useDataFetching from "../../../../hooks/useFech";

const UpcomingAppointments = ({ darkMode }) => {
  const [loading, error, data, fetchData] = useDataFetching(
    "upcoming-appointments"
  );
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div
      className={`rounded-xl shadow-lg p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
      {loading ? (
        <p>Loading Appointments...</p>
      ) : error ? (
        <p>Error loading appointments</p>
      ) : (
        <>
          {data?.data?.length > 0 ? (
            <div className="space-y-4">
              {data.data.map((appointment) => (
                <UpcomingAppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  userType={currentUser?.data?.user?.userType}
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
