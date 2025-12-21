import httpRequest from "./httpRequest";

export const getExploreVideos = async () => {
  const response = await httpRequest.get("/explore/videos");
  return response.data;
}