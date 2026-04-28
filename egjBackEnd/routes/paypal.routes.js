import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  captureOrder,
  createOrder,
  createDirectOrder,
  paypalWebhook,
} from "../controllers/paypalController.js";

const paypalRouter = express.Router();

/**
 * POST /api/v1/paypal/create-order
 * Protected — user must be logged in (Clerk + our protect middleware).
 * Body: { bookingId }
 */
paypalRouter.post("/create-order", protect, createOrder);

/**
 * POST /api/v1/paypal/create-direct-order
 * Protected — creates a PayPal order for a fixed amount without a booking doc.
 * Body: { amount, currency?, description? }
 */
paypalRouter.post("/create-direct-order", protect, createDirectOrder);

/**
 * POST /api/v1/paypal/capture-order
 * Protected — called by the frontend /paypal/return page.
 * Body: { orderId, bookingId }
 */
paypalRouter.post("/capture-order", protect, captureOrder);

/**
 * POST /api/v1/paypal/webhook
 * PUBLIC — PayPal pushes events directly; signature verified inside handler.
 * Uses express.json() (default) — PayPal does not require raw bytes for
 * its server-side verification API (unlike Stripe).
 */
paypalRouter.post("/webhook", paypalWebhook);

export default paypalRouter;
