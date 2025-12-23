import httpRequest from "./httpRequest";

export const getSearch = async (value) => {
  const response = await httpRequest.get(`/search/suggestions?q=${value}`);
  return response.data;
}