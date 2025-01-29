import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";
import globalRouter from "./global-router";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'Application/json',
  }
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { clearAccessToken } = useAuthStore.getState();
      clearAccessToken();
      if (globalRouter.navigate) {
        globalRouter.navigate({ to: '/auth', search: { type: 'login' } })
      }
    }
    return Promise.reject(error);
  }
);

export { instance }
