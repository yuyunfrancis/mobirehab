import api from "../utils/api";

export const login = async (email, password, API_ENDPOINT) => {
  try {
    const response = await api.post(API_ENDPOINT, {
      email,
      password,
    });

    const token = response.data.token;

    if (token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    } else {
      throw new Error("User not found or Invalid credentials");
    }

    return response.data;
  } catch (err) {
    console.error("Error during login:", err);
    if (err.response && err.response.status === 503) {
      return null;
    } else {
      throw err;
    }
  }
};

export const signup = async (data, API_ENDPOINT) => {
  try {
    const response = await api.post(API_ENDPOINT, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const token = response.data.token;

    if (!token) {
      throw new Error("Invalid credentials");
    }

    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error); // Log the full error for debugging
    if (error.response && error.response.status === 503) {
      throw new Error("Service Unavailable. Please try again later.");
    }
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Registration failed. Please try again.");
  }
};

export const logout = async (API_ENDPOINT) => {
  try {
    await api.post(API_ENDPOINT);
    localStorage.removeItem("user");
  } catch (err) {
    console.error("Error during logout:", err);
    throw err;
  }
};

export const isAuthenticated = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? user : null;
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
    return null;
  }
};
