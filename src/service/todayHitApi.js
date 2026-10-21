import httpRequest from "./httpRequest";

export const getTodayHit = async () => {
  const response = await httpRequest.get("/home/todays-hits");
  return response.data;
}