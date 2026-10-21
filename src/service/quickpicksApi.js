import httpRequest from "./httpRequest";

export const getQuickPicks = async () => {
  const response = await httpRequest.get("/quick-picks")
  return response.data;
}