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
    const response = await api.post(API_ENDPOINT, data);
    const token = response.data.token;

    if (token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    } else {
      throw new Error("Invalid credentials");
    }

    return response.data;
  } catch (err) {
    console.error("Error during signup:", err);
    if (err.response && err.response.status === 503) {
      return null;
    } else {
      throw err;
    }
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

// export const isAuthenticated = async () => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.token && user.userType) {
//       const endpoint =
//         user.userType === "patient" ? "patients/profile" : "therapists/profile";
//       const response = await api.get(endpoint, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       return response.data ? user : null;
//     }
//     return null;
//   } catch (error) {
//     console.error("Error validating token", error);
//     return null;
//   }
// };
