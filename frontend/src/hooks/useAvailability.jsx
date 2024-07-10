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
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }
      onUpdate(id);
      return data;
    } catch (err) {
      setError(err.message);
      console.error(`Error: ${err.message}`);
      throw err;
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
        api.delete(`/api/v1/therapist/my-availability/${id}`, {
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
