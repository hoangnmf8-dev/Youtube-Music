import httpRequest from "./httpRequest";

export const getNewRelease = async () => {
  const response = await httpRequest.get("/explore/new-releases");
  return response.data;
}

export const getNewReleaseVideos = async () => {
  const response = await httpRequest.get("/explore/videos");
  return response.data
}

