import axios from "axios";

const baseURL = 'https://api.prof.world/v2.0/profile/';

export const axiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});
