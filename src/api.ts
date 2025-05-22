// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // your Fastify API URL
  withCredentials: true, // include cookies!
});

// Axios interceptor to auto-refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/users/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.get("/api/users/refresh", {
          withCredentials: true,
        }); // will read from cookie

        const newAccessToken = res.data.accessToken;

        // Attach new token to the original request and retry it
        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest); // retry the original request
      } catch (err) {
        // refresh failed – redirect to login or show error
        console.error("Token refresh failed:", err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
