import httpRequest from "./httpRequest";

export const getExploreVideos = async () => {
  const response = await httpRequest.get("/explore/videos");
  return response.data;
}

export const getVideoDetail = async (slug) => {
  const response = await httpRequest.get(`/videos/details/${slug}`);
  return response.data;
}