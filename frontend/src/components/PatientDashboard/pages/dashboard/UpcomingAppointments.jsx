// import React from "react";
// import { motion } from "framer-motion";
// import { FaCalendarAlt } from "react-icons/fa";

// const UpcomingAppointments = ({ appointments, darkMode }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     className={`${
//       darkMode ? "bg-gray-800" : "bg-white"
//     } rounded-lg shadow-md p-6`}
//   >
//     <h2 className="text-2xl font-semibold mb-4 flex items-center">
//       <FaCalendarAlt className="mr-2 text-blue-500" /> Upcoming Appointments
//     </h2>
//     {appointments.map((appointment) => (
//       <div key={appointment.id} className="mb-4 p-4 bg-blue-50 rounded-lg">
//         <p className="font-semibold text-lg">
//           {appointment.doctor} - {appointment.specialty}
//         </p>
//         <p className="text-gray-600">
//           {new Date(appointment.date).toLocaleDateString()} at{" "}
//           {appointment.time}
//         </p>
//       </div>
//     ))}
//   </motion.div>
// );

// export default UpcomingAppointments;

import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import useDataFetching from "../../../../hooks/useFech";
import { UserContext } from "../../../../context/UserContext";

const UpcomingAppointments = ({ darkMode }) => {
  // const { patient, therapist, date, time } = appointment;

  const [loading, error, data, fetchData] = useDataFetching(
    "upcoming-appointments"
  );
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const userType = currentUser?.data?.user?.userType;

  console.log("upcoming appointments", data?.data);

  // const displayName =
  //   userType === "patient"
  //     ? `${data?.data?.therapist?.firstName} ${data?.data?.therapist?.lastName}`
  //     : `${data?.data?.patient?.firstName} ${data?.data?.patient?.lastName}`;

  // console.log("display name", displayName);
  return (
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
      {loading ? (
        <p>Loading Appointments...</p>
      ) : error ? (
        <p>Error loading appointments</p>
      ) : data && data?.data?.length > 0 ? (
        data?.data?.map((appointment) => (
          <div key={appointment._id} className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold text-lg">
              Dr {appointment?.therapist?.firstName}{" "}
              {appointment?.therapist?.lastName} -{" "}
              {appointment?.therapist?.specialization}
            </p>
            <p className="text-gray-600">
              {new Date(appointment.date).toLocaleDateString()} at{" "}
              {appointment.time}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No upcoming appointments</p>
      )}
    </motion.div>
  );
};

export default UpcomingAppointments;
