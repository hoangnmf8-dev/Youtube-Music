import httpRequest from "./httpRequest"

export const getAlbums = async () => {
  const response = await httpRequest.get("/home/albums-for-you");
  return response.data;
}