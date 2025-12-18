import httpRequest from "./httpRequest";

export const getMoods = async () => {
  const response = await httpRequest.get("/moods");
  return response.data;
}