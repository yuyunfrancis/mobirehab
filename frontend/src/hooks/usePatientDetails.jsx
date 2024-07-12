import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import api from "../utils/api";

const usePatientDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patient, setPatient] = useState(null);
  const { currentUser } = useContext(UserContext);

  const fetchPatientDetails = async (patientId) => {
    if (!patientId) {
      setError("No patient ID provided");
      setLoading(false);
      return;
    }
    if (!currentUser?.token) {
      setError("No user token available");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/therapist/patient/${patientId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setPatient(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching patient details:", err);
      setError(
        err.response?.data?.message || "Failed to fetch patient details"
      );
      setLoading(false);
    }
  };

  return { loading, error, patient, fetchPatientDetails };
};

export default usePatientDetails;
