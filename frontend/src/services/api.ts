import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true, // Send cookies for Better Auth sessions
  headers: { "Content-Type": "application/json" },
});

// Redirect to login on 401 (except for auth endpoints)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      err.response?.status === 401 &&
      !err.config?.url?.includes("/api/auth/")
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
