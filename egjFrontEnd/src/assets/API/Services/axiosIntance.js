import axios from "axios";

import useAuthStore from "../../../store/auth";

const api = axios.create({
  baseURL: "https://egj-back-end.vercel.app/api/v1/",
  headers: { "Content-Type": "application/json" },
});

//if token exist on request add Bearer Token on headers
api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept responses globally
// api.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid → clear auth + redirect
//       const { logout } = useAuthStore.getState();
//       logout();
//       window.location.href = "/login"; // force redirect
//     }
//     return Promise.reject(error.response?.data || error.message);
//   }
// );

// Async/Await wrapper functions
export const apiGet = async (url, config = {}) => {
  try {
    const response = await api.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiPost = async (url, data = {}, config = {}) => {
  try {
    const response = await api.post(url, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiPut = async (url, data = {}, config = {}) => {
  try {
    const response = await api.put(url, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiDelete = async (url, config = {}) => {
  try {
    const response = await api.delete(url, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiPatch = async (url, data = {}, config = {}) => {
  try {
    const response = await api.patch(url, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;
