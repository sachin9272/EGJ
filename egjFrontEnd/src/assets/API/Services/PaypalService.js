import { apiPost } from "./axiosIntance.js";

/**
 * Create a PayPal order for the booking deposit on a booking.
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

/**
 * Create a PayPal order from the 2026 tour pricing table.
 * Used by standalone tour page booking flows.
 *
 * @param {object} params
 * @param {string} [params.currency]   - ISO code, defaults to USD
 * @param {object} params.formData     - Customer and tour form data
 */
export const createDirectPaypalOrder = async ({ formData, currency = "USD" }) => {
  const response = await apiPost("paypal/create-direct-order", {
    formData,
    currency,
  });
  return response.data; // { orderId, approvalUrl, bookingId }
};
