import axios from "axios";

const apiUrl = "http://localhost:5000/";

const api = axios.create({
  baseURL: `${apiUrl}api/v1/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
