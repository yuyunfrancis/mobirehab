import { useContext, useState } from "react";
import api from "../utils/api";
import { UserContext } from "../context/UserContext";

export const useAvailability = (onUpdate) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { currentUser } = useContext(UserContext);

  const handleAction = async (action, id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await action(id);
      // Assuming the API returns data in the 'data' property
      if (response.data) {
        onUpdate(id);
        return response.data;
      } else {
        throw new Error("No data received from the server");
      }
    } catch (err) {
      // If it's an error from the API, it might be in err.response.data
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unknown error occurred";
      setError(errorMessage);
      console.error(`Error: ${errorMessage}`);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const activateAvailability = (id) =>
    handleAction(
      () =>
        api.put(
          `/therapist/my-availability/${id}/activate`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        ),
      id
    );

  const deactivateAvailability = (id) =>
    handleAction(
      () =>
        api.put(
          `/api/v1/therapist/my-availability/${id}/deactivate`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        ),
      id
    );

  const deleteAvailability = (id) =>
    handleAction(
      () =>
        api.delete(`/therapist/my-availability/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }),
      id
    );

  return {
    activateAvailability,
    deactivateAvailability,
    deleteAvailability,
    isLoading,
    error,
  };
};
