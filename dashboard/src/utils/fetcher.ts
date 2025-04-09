import axios from "axios";

const api = axios.create({
  baseURL: "http://ws.audioscrobbler.com/2.0",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: import.meta.env.VITE_LASTFM_API_KEY,
  },
});

export const fetcher = async (url: string) => {
  const res = await api.get(url);
  return res.data;
};
