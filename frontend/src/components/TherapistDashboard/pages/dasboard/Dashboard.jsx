// import React, { useState } from "react";
// import FormAction from "../../common/forms/FormAction";
// import { logout } from "../../../services/AuthServices";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       setLoading(true);
//       const END_POINT = "patient/logout";
//       await logout(END_POINT);
//       setLoading(false);
//       toast.success("Logged out successfully");
//       navigate("/patient/login", { replace: true }); // Use absolute path
//     } catch (err) {
//       console.error(err);
//       setLoading(false); // Ensure loading state is reset on error
//       toast.error("Logout failed. Please try again.");
//     }
//   };

//   return (
//     <div>
//       Dashboard
//       <div className="flex flex-grow flex-col justify-center">
//         <h1>Dashboard</h1>
//         <p>Welcome to your dashboard</p>
//         <button onClick={handleLogout}>
//           {loading ? "Logging out..." : "Logout"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState } from "react";
// import FormAction from "../../common/forms/FormAction";
// import { logout } from "../../../services/AuthServices";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       setLoading(true);
//       const END_POINT = "patient/logout";
//       await logout(END_POINT);
//       setLoading(false);
//       toast.success("Logged out successfully");
//       navigate("/patient/login", { replace: true });
//     } catch (err) {
//       setLoading(false);
//       toast.error("Logout failed. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-grow flex-col justify-center">
//         <h1>Dashboard</h1>
//         <p>Welcome to your dashboard</p>
//         <button onClick={handleLogout}>
//           {loading ? "Logging out..." : "Logout"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from "react";
import TherapistProfile from "./TherapistProfile";
import UpcomingAppointments from "./UpcomingAppointments";
import StatCard from "./StatCard";
import Chart from "./Chart";
// Mock data
const stats = [
  { title: "Appointments", value: 150, icon: "calendar" },
  { title: "Patients", value: 75, icon: "users" },
  { title: "Income", value: "15,000", icon: "dollar-sign" },
  { title: "Rating", value: "4.8", icon: "star" },
];

const appointments = [
  { id: 1, patient: "John Doe", date: "2024-07-30 10:00 AM", type: "Regular" },
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

const patients = [
  { id: 1, name: "John Doe", age: 35, lastVisit: "2024-07-15" },
  { id: 2, name: "Jane Smith", age: 28, lastVisit: "2024-07-20" },
  { id: 3, name: "Bob Johnson", age: 42, lastVisit: "2024-07-25" },
];

const chartData = [
  { month: "Jan", patients: 50, appointments: 100, income: 10000 },
  { month: "Feb", patients: 60, appointments: 120, income: 12000 },
  { month: "Mar", patients: 75, appointments: 150, income: 15000 },
  // ... more data
];

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Therapist Dashboard</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} darkMode={darkMode} />
              ))}
            </div>

            {/* Chart */}
            <div
              className={`rounded-xl shadow-lg p-6 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">
                Performance Overview
              </h2>
              <Chart darkMode={darkMode} data={chartData} />
            </div>

            {/* Patients Table */}
            <div
              className={`rounded-xl shadow-lg overflow-hidden ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2 className="text-xl font-semibold p-6">Patients</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Last Visit
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y ${
                      darkMode ? "divide-gray-700" : "divide-gray-200"
                    }`}
                  >
                    {patients.map((patient) => (
                      <tr
                        key={patient.id}
                        className="hover:bg-opacity-10 hover:bg-gray-200 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {patient.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {patient.age}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {patient.lastVisit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Therapist Profile and Upcoming Appointments */}
          <div className="lg:col-span-1 space-y-8">
            <TherapistProfile darkMode={darkMode} />
            <UpcomingAppointments darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
