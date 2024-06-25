import React, { createContext, useState, useEffect } from "react";
import { isAuthenticated } from "../services/AuthServices";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await isAuthenticated();
      if (user) {
        setCurrentUser(user);
      } else {
        navigate("/welcome", { replace: true });
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
