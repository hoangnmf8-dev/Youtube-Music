import httpRequest from "./httpRequest";

export default async function eventPlay(payload) {
  const response = await httpRequest.post("/events/play", payload);
  return response.data;
}