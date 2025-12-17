import httpRequest from "./httpRequest";

export const register = async (payload) => {
  const response = await httpRequest.post("/auth/register", payload);
  return response.data;
}

export const login = async (payload) => {
  const response = await httpRequest.post("/auth/login", payload);
  return response.data;
}

