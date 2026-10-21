import httpRequest from "./httpRequest";

export const getPersonalized = async () => {
  const response = await httpRequest.get("/home/personalized?limit=12");
  return response.data;
}