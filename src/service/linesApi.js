import httpRequest from "./httpRequest";

export const getLineSongs = async (slug) => {
  const response = await httpRequest.get(`/lines/${slug}/songs`);
  return response.data;
}

export const getLinePlaylists = async (slug) => {
  const response = await httpRequest.get(`/lines/${slug}/playlists`);
  return response.data;
}

export const getLineVideos = async (slug) => {
  const response = await httpRequest.get(`/lines/${slug}/videos`);
  return response.data;
}

export const getLineAlbums = async (slug) => {
  const response = await httpRequest.get(`/lines/${slug}/albums`);
  return response.data;
}