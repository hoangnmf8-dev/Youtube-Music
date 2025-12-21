import httpRequest from "./httpRequest"

export const getCategories = async () => {
  const response = await httpRequest.get("/categories");
  return response.data;
}

export const getLine = async () => {
  const response = await httpRequest.get("/lines");
  return response.data;
}