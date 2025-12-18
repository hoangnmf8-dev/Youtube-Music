import httpRequest from "./httpRequest";

export const register = async (payload) => {
  const response = await httpRequest.post("/auth/register", payload);
  return response.data;
}

export const login = async (payload) => {
  const response = await httpRequest.post("/auth/login", payload);
  return response.data;
}

export const getProfile = async () => {
  const response = await httpRequest.get("/auth/me");
  return response.data;
}

export const updateProfile = async (payload) => {
  const response = await httpRequest.patch("/auth/me", payload);
  return response.data;
}

export const updatePassword = async (payload) => {
  const response = await httpRequest.patch("/auth/change-password", payload);
  return response.data;
}