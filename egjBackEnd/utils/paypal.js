// ─── PayPal REST API Utility Helpers ───────────────────────────────────────
// Uses Node.js built-in fetch (Node 18+). No extra SDK required.

export const PAYPAL_BASE =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

/**
 * Exchange client credentials for a short-lived Bearer token.
 */
export const getPayPalAccessToken = async () => {
  const credentials = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal token error: ${err}`);
  }

  const data = await res.json();
  return data.access_token;
};

/**
 * Create a PayPal Orders v2 order.
 * @param {object} params
 * @param {string} params.bookingId - MongoDB booking _id (stored as custom_id)
 * @param {number} params.depositAmount - Amount in major units (e.g. 150.00)
 * @param {string} params.currency     - ISO code, e.g. "USD"
 * @param {string} params.description  - Line-item description shown at checkout
 */
export const createPayPalOrder = async ({
  bookingId,
  depositAmount,
  currency,
  description,
}) => {
  const accessToken = await getPayPalAccessToken();
  const currency_code = currency || process.env.PAYPAL_CURRENCY || "USD";

  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        custom_id: bookingId, // echoed back in webhook events
        description,
        amount: {
          currency_code,
          value: depositAmount.toFixed(2),
        },
      },
    ],
    payment_source: {
      paypal: {
        experience_context: {
          payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
          brand_name: "Expeditions George of the Jungle",
          locale: "en-US",
          landing_page: "LOGIN",
          user_action: "PAY_NOW",
          return_url: `${process.env.CLIENT_URL}/paypal/return`,
          cancel_url: `${process.env.CLIENT_URL}/paypal/cancel`,
        },
      },
    },
  };

  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`PayPal create order error: ${JSON.stringify(err)}`);
  }

  return await res.json(); // { id, status, links, ... }
};

/**
 * Capture an approved PayPal order.
 * @param {string} orderId - PayPal order ID
 */
export const capturePayPalOrder = async (orderId) => {
  const accessToken = await getPayPalAccessToken();

  const res = await fetch(
    `${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`PayPal capture error: ${JSON.stringify(err)}`);
  }

  return await res.json(); // { id, status, purchase_units, payer, ... }
};

/**
 * Verify a PayPal webhook signature by calling PayPal's verification API.
 * Returns true if valid, false otherwise.
 */
export const verifyPayPalWebhook = async ({
  authAlgo,
  certUrl,
  transmissionId,
  transmissionSig,
  transmissionTime,
  webhookBody, // parsed JSON object
}) => {
  if (!process.env.PAYPAL_WEBHOOK_ID) {
    console.warn(
      "PAYPAL_WEBHOOK_ID not set — skipping webhook signature verification"
    );
    return true; // allow in dev if not configured
  }

  const accessToken = await getPayPalAccessToken();

  const res = await fetch(
    `${PAYPAL_BASE}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: process.env.PAYPAL_WEBHOOK_ID,
        webhook_event: webhookBody,
      }),
    }
  );

  if (!res.ok) return false;
  const data = await res.json();
  return data.verification_status === "SUCCESS";
};
