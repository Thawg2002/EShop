// src/lib/api-client.ts
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // Crucial for receiving/sending cookies (refresh token)
});

// Request Interceptor: Attach Access Token from localStorage
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Handle automatic token refresh on 401
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 (Unauthorized) and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token using the httpOnly cookie
        const refreshRes = await axios.post(
          `${apiClient.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const { accessToken } = refreshRes.data.data;

        // Save new access token
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", accessToken);
        }

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token expired or invalid -> logout
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
          const currentPath = window.location.pathname;
          if (currentPath !== "/dang-nhap" && currentPath !== "/dang-ky") {
            window.location.href = "/dang-nhap";
          }
        }
        return Promise.reject(refreshError);
      }
    }

    // Standardize error message
    const message =
      error.response?.data?.message || error.message || "Lỗi kết nối Server";
    return Promise.reject({ ...error, message });
  },
);

export default apiClient;
