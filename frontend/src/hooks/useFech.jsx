import { useState, useEffect, useContext, useCallback } from "react";
import api from "../utils/api";
import { UserContext } from "../context/UserContext";

const useDataFetching = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.data.token}`,
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [url, currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${currentUser.data.token}`,
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchData(); // Initial fetch

    // No return statement or cleanup needed with useEffect
  }, [url, currentUser]);

  return [loading, error, data, fetchData];
};

export default useDataFetching;
