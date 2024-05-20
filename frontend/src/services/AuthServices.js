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

export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.token ? JSON.parse("user") : null;
};
