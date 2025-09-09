import axios from "axios";
import { data } from "react-router-dom";

const DEFAULT_BASE = import.meta.env.VITE_API_URL || "https://interviewreviewer-backend.onrender.com";
console.log(DEFAULT_BASE,'DEFAULT_BASE')

const api = axios.create({
  baseURL: DEFAULT_BASE,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const t = localStorage.getItem("token");
  if (t && t !== "undefined") {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
}, (err) => Promise.reject(err));


export default api;
