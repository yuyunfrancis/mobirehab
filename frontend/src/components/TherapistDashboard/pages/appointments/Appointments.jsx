import React, { useState, useEffect } from "react";
import useDataFetching from "../../../../hooks/useFech";
import AppointmentTable from "./AppointmentTable";
import { FiSearch, FiFilter } from "react-icons/fi";
import Loading from "../../../utilities/Loading";

const Appointments = () => {
  const [loading, error, data] = useDataFetching("/therapist/appointments");
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      let filtered = data.data;

      if (searchTerm) {
        filtered = filtered.filter(
          (appointment) =>
            appointment.patient.firstName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            appointment.patient.lastName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (statusFilter !== "All") {
        filtered = filtered.filter(
          (appointment) => appointment.status === statusFilter
        );
      }

      setFilteredData(filtered);
    }
  }, [data, searchTerm, statusFilter]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAppointments(filteredData.map((app) => app._id));
    } else {
      setSelectedAppointments([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedAppointments((prev) =>
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action) => {
    // Implement bulk action logic here
    console.log(`Performing ${action} on`, selectedAppointments);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Appointments</h1>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search appointments..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <div className="w-full sm:w-1/3">
          <select
            className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <FiFilter className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {selectedAppointments.length > 0 && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
          <span>{selectedAppointments.length} appointments selected</span>
          <div>
            <button
              onClick={() => handleBulkAction("cancel")}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel Selected
            </button>
            <button
              onClick={() => handleBulkAction("reschedule")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
              Reschedule Selected
            </button>
          </div>
        </div>
      )}

      {filteredData.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p>No appointments found.</p>
        </div>
      ) : (
        <AppointmentTable
          appointments={filteredData}
          selectedAppointments={selectedAppointments}
          onSelectAll={handleSelectAll}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default Appointments;
