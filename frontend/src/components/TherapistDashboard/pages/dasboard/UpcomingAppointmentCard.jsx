import React from "react";

const UpcomingAppointmentCard = ({ patient, date, darkMode }) => {
  return (
    <div
      className={`rounded-lg p-4 flex justify-between items-center ${
        darkMode ? "bg-gray-700" : "bg-gray-100"
      } hover:shadow-md transition-shadow duration-300`}
    >
      <div>
        <h3 className="font-semibold">{patient}</h3>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {date}
        </p>
      </div>
      {/* <span
        className={`px-3 py-1 rounded-full text-sm ${
          darkMode
            ? "bg-indigo-900 text-indigo-200"
            : "bg-indigo-100 text-indigo-800"
        }`}
      >
        {type}
      </span> */}
    </div>
  );
};

export default UpcomingAppointmentCard;
