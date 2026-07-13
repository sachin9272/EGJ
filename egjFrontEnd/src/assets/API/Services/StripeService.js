import { apiPost } from "./axiosIntance";

export const createDirectStripeOrder = async (data) => {
  const response = await apiPost("/checkout/create-direct-session", data);
  return response.data;
};
