import axios from "axios";

// const BASE_URL = "https://spendo.onrender.com";
const BASE_URL = "http://192.168.0.101:4000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
