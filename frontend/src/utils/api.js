import axios from "axios";

const apiLocalUrl = "http://localhost:5000/";
const apiLiveUrl = "https://mobirehab.onrender.com/";

const api = axios.create({
  baseURL: `${apiLiveUrl}api/v1/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
