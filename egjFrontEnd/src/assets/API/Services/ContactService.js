import { apiPost } from "./axiosIntance";

export const sendContactMessage = async (formData) => {
  const response = await apiPost("/contact", formData);
  return response.data;
};
