import { apiPost } from "./axiosIntance";

export const createDirectStripeOrder = async (data) => {
  const response = await apiPost("/checkout/create-direct-session", data);
  return response.data;
};

export const createCustomPaymentOrder = async (data) => {
  const response = await apiPost("/checkout/create-custom-payment-session", data);
  return response.data;
};
