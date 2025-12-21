import httpRequest from "./httpRequest";

export const getHomeMoods = async () => {
  const response = await httpRequest.get("/moods");
  return response.data;
}

export const getExploreMoods = async () => {
  const response = await httpRequest.get("/explore/meta");
  return response.data;
}

export const getMoodsDetail = async (slug) => {
  const response = await httpRequest.get(`/moods/${slug}`);
  return response.data;
}

export const getQuickPickMoods = async (slug) => {
  const response = await httpRequest.get(`/quick-picks?mood=${slug}`);
  return response.data;
}