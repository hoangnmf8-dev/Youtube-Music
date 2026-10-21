import axios from "axios";
import { router } from "../route/router";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
let refreshPromise = null;

export const logout = () => {
  const refreshToken = localStorage.getItem("refresh_token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  router.navigate("/login");
  refreshPromise = null;
  if (refreshToken) {
    fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }).catch(() => {});
  }
};

const getNewToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem("refresh_token"),
      }),
    });
    if (!response.ok) throw new Error("Unauthorize");
    return response.json();
  } catch (error) {
    return false;
  }
};

const httpRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

httpRequest.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

httpRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const requestUrl = error.config?.url || "";
    const isAuthEndpoint = /^\/?auth\/(login|register|refresh-token|logout)(?:\?|$)/.test(requestUrl);
    if (+error.response?.status === 401 && !isAuthEndpoint && localStorage.getItem("access_token") && localStorage.getItem("refresh_token")) {
      const originalRequest = error.config;
      if (!originalRequest || originalRequest._retry) {
        logout();
        return Promise.reject(error);
      }
      originalRequest._retry = true;
      if (!refreshPromise) refreshPromise = getNewToken();
      const refreshRequest = refreshPromise;
      const newToken = await refreshRequest;
      if (refreshPromise === refreshRequest) refreshPromise = null;
      if (newToken) {
        localStorage.setItem("access_token", newToken.access_token);
        localStorage.setItem("refresh_token", newToken.refresh_token);
        return httpRequest(originalRequest);
      } else {
        logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default httpRequest;
