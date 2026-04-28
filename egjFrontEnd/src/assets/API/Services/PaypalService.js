import { apiPost } from "./axiosIntance.js";

/**
 * Create a PayPal order for the 30% deposit on a booking.
 * Returns { orderId, approvalUrl } — redirect the user to approvalUrl.
 *
 * @param {string} bookingId - MongoDB booking _id
 */
export const createPaypalOrder = async (bookingId) => {
  const response = await apiPost("paypal/create-order", { bookingId });
  return response.data; // { orderId, approvalUrl }
};

/**
 * Capture an approved PayPal order (called from /paypal/return page).
 * Returns { captured: true } when successful.
 *
 * @param {string} orderId   - PayPal order ID (from URL param "token")
 * @param {string} bookingId - MongoDB booking _id (from URL param "bookingId")
 */
export const capturePaypalOrder = async (orderId, bookingId) => {
  const response = await apiPost("paypal/capture-order", { orderId, bookingId });
  return response.data; // { captured: true }
};
