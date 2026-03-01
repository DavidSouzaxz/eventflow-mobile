import axios from "axios";
import { storage } from "./storage";

export const api = axios.create({
  baseURL: "https://event-flow-server.onrender.com",
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await storage.getToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
