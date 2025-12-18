import httpRequest from "./httpRequest";

export const getPlaylistCountry = async() => {
  const response = await httpRequest.get("/playlists/by-country?country=VN");
  return response.data;
}