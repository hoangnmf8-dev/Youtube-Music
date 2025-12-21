import httpRequest from "./httpRequest";

export const getCountries = async () => {
  const response = await httpRequest.get("/charts/countries");
  return response.data;
}

export const getVideosCountries = async (country) => {
  const response = await httpRequest.get(`/charts/videos?country=${country}`);
  return response.data;
}

export const getArtistsCountries = async (country) => {
  const response = await httpRequest.get(`/charts/top-artists?country=${country}`);
  return response.data;
}