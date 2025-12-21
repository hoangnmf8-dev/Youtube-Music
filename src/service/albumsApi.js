import httpRequest from "./httpRequest"

export const getHomeAlbums = async () => {
  const response = await httpRequest.get("/home/albums-for-you");
  return response.data;
}

export const getExploreAlbums = async () => {
  const response = await httpRequest.get("/explore/albums");
  return response.data;
}