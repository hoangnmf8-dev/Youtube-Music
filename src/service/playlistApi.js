import httpRequest from "./httpRequest";

export const getPlaylistDetail = async (slug) => {
  const response = await httpRequest.get(`/playlists/details/${slug}?limit=50`);
  return response.data;
}

export const getSongDetail = async (slug) => {
  const response = await httpRequest.get(`/songs/details/${slug}`);
  return response.data;
}