import React, { useState, useEffect } from "react";
import {
  FiMessageSquare,
  FiPhone,
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiMail,
  FiFlag,
} from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import useUpdateAppointmentStatus from "../../../../hooks/useUpdateAppointmentStatus";
import usePatientDetails from "../../../../hooks/usePatientDetails";
import useAppointmentDetails from "../../../../hooks/useAppointmentDetails";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [showDeclineWarning, setShowDeclineWarning] = useState(false);

  const {
    appointment,
    loading: appointmentLoading,
    error: appointmentError,
  } = useAppointmentDetails(id);

  const {
    updateStatus,
    loading: updateLoading,
    error: updateError,
  } = useUpdateAppointmentStatus();

  const {
    patient,
    loading: patientLoading,
    error: patientError,
    fetchPatientDetails,
  } = usePatientDetails();

  useEffect(() => {
    if (appointment?.data?.patient) {
      fetchPatientDetails(appointment.data.patient);
    }
  }, [appointment, fetchPatientDetails]);

  if (appointmentLoading || patientLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (appointmentError || patientError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500 text-xl">
          Error: {appointmentError || patientError}
        </p>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    email,
    profilePicture,
    phoneNumber,
    guardianPhoneNumber,
    gender,
    dateOfBirth,
    address,
    patientId,
  } = patient.data;

  const handleStatusChange = async (newStatus) => {
    if (newStatus === "Declined" && !showDeclineWarning) {
      setShowDeclineWarning(true);
    } else {
      try {
        await updateStatus(appointment._id, newStatus);
        setShowDeclineWarning(false);
      } catch (err) {
        console.error("Failed to update appointment status:", err);
      }
    }
  };

  const handleAddNote = () => {
    // Implement note addition logic here
    setNote("");
  };

  const handleBack = () => {
    navigate("/therapist/appointments");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-8 flex items-center text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
        >
          <FiArrowLeft className="mr-2" />
          Back to Appointments
        </button>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-indigo-50">
            <h2 className="text-3xl font-bold text-indigo-900">
              Appointment Details
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                appointment?.data.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : appointment?.data.status === "Accepted"
                  ? "bg-green-100 text-green-800"
                  : appointment?.data.status === "Declined"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {appointment?.data.status}
            </span>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FiUser className="mr-2" />
                  Patient
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt={`${firstName} ${lastName}`}
                      className="h-12 w-12 rounded-full mr-3 object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 text-xl mr-3">
                      {firstName ? firstName[0].toUpperCase() : ""}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-lg">{`${firstName} ${lastName}`}</p>
                    <p className="text-gray-500 text-sm">{email}</p>
                    <p className="text-gray-500 text-sm">
                      Patient ID: {patientId}
                    </p>
                  </div>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FiCalendar className="mr-2" />
                  Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(appointment?.data?.date).toLocaleDateString()}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FiClock className="mr-2" />
                  Time
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {appointment?.data?.time}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FiMapPin className="mr-2" />
                  Service
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {appointment?.data?.service}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Reason</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {appointment?.data?.purpose}
                </dd>
              </div>
              {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FiPhone className="mr-2" />
                  Contact
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p>Phone: {phoneNumber}</p>
                  <p>Guardian Phone: {guardianPhoneNumber}</p>
                </dd>
              </div> */}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FiFlag className="mr-2" />
                  Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p>{address.street}</p>
                  <p>
                    {address.district}, {address.city}
                  </p>
                  <p>{address.country}</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {appointment?.data.status === "Pending" && (
          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => handleStatusChange("Accepted")}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out"
              disabled={updateLoading}
            >
              {updateLoading ? "Loading..." : "Accept"}
            </button>
            <button
              onClick={() => handleStatusChange("Declined")}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out"
              disabled={updateLoading}
            >
              {updateLoading ? "Loading..." : "Decline"}
            </button>
          </div>
        )}

        {showDeclineWarning && (
          <div
            className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
            role="alert"
          >
            <p className="font-bold">Are you sure?</p>
            <p>
              Do you really want to decline this appointment? This action cannot
              be undone.
            </p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleStatusChange("Declined")}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
                disabled={updateLoading}
              >
                Yes, Decline
              </button>
              <button
                onClick={() => setShowDeclineWarning(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
                disabled={updateLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-indigo-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add Note
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Optional</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Add a note about this appointment (optional)"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddNote}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
