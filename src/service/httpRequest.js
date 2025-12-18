import axios from "axios";
import { router } from "../route/router";

const BASE_URL = import.meta.env.VITE_BASE_URL;
let refreshPromise = null;

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  router.navigate("/login");
  refreshPromise = null;
};

const getNewToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: localStorage.getItem("refresh_token"),
      }),
    });
    if (!response.ok) throw new Error("Unauthorize");
    return response.json();
  } catch (error) {
    return false;
  }
};

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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
    if (+error.response?.status === 401) {
      if (error.config?._retry) {
        logout();
        return;
      }
      error.config._retry = true;
      if (!refreshPromise) {
        refreshPromise = getNewToken();
      }
      const newToken = await refreshPromise;
      refreshPromise = null;
      if (newToken) {
        localStorage.setItem("access_token", newToken.access_token);
        localStorage.setItem("refresh_token", newToken.refresh_token);
        return httpRequest(error.config);
      } else {
        logout();
        return;
      }
    }
    return Promise.reject(error);
  }
);

export default httpRequest;