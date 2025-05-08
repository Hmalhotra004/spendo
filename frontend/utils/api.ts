import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://192.168.0.106:3000"
    : "https://bookworm-kes2.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
