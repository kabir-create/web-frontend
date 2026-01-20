import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// attach mock auth header
api.interceptors.request.use((config) => {
  const phone = localStorage.getItem("phone");
  if (phone) {
    config.headers["x-phone"] = phone;
  }
  return config;
});

export default api;
