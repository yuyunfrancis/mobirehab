import React, { createContext, useState, useEffect } from "react";
import { isAuthenticated } from "../services/AuthServices";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const user = isAuthenticated();
      if (user) {
        setCurrentUser(user);
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
