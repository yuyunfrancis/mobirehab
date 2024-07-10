import React, { useState, useEffect } from "react";
import api from "../../../../utils/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AvailabilityCard from "./AvailabilityCard";
import { useAvailability } from "../../../../hooks/useAvailability";
import Button from "../../../common/Button";

const Availabilities = ({ history }) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    activateAvailability,
    deactivateAvailability,
    deleteAvailability,
    isLoading,
    error,
  } = useAvailability(handleUpdate);

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const fetchAvailabilities = async () => {
    setLoading(true);
    try {
      const response = await api.get("/therapist/my-availability");
      setAvailabilities(response?.data?.data);
    } catch (err) {
      toast.error(
        "Error fetching availabilities: " + (err.message || "An error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  function handleUpdate(id) {
    fetchAvailabilities();
  }

  const handleEdit = (availability) => {
    history.push({
      pathname: `/edit-availability/${availability._id}`,
      state: { availability },
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  console.log("Availabilities", availabilities);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Availabilities</h1>
        <div className="flex space-x-4">
          <Link to="/therapist/availability/create">
            <Button
              label="Create Availability"
              variant="filled"
              color="greenPrimary"
            />
          </Link>
          <Button
            label={loading || isLoading ? "Loading..." : "Refresh"}
            onClick={fetchAvailabilities}
            disabled={loading || isLoading}
            loading={loading || isLoading}
            variant="filled"
            color="indigo-600"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : availabilities.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">
          No availabilities found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availabilities.flatMap((availability) =>
            availability.dates.map((date) => (
              <AvailabilityCard
                key={`${availability.id}-${date.date}`}
                availability={{
                  _id: availability.id,
                  availabilityName: availability.name,
                  date: date.date,
                  times: date.times,
                  isActive: availability.isActive,
                }}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Availabilities;
