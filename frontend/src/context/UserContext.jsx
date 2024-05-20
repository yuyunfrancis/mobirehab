import { useState, useEffect, createContext } from "react";
import { isAuthenticated } from "../services/AuthServices";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await isAuthenticated();
      setCurrentUser(user);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
