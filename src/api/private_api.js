import axios from "axios";

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("social-app-token");
    console.log("token", token);
    if (!token) {
      return Promise.reject(new Error("Token not found!"));
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

privateApi.interceptors.response.use(
  (res) => res?.data,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("social-app-token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  },
);
