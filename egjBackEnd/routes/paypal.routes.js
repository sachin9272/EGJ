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
 * Public guest checkout — creates a booking and PayPal order from form data.
 * Body: { amount, currency?, description? }
 */
paypalRouter.post("/create-direct-order", createDirectOrder);

/**
 * POST /api/v1/paypal/capture-order
 * Public guest checkout return — verifies bookingId + PayPal orderId match.
 * Body: { orderId, bookingId }
 */
paypalRouter.post("/capture-order", captureOrder);

/**
 * POST /api/v1/paypal/webhook
 * PUBLIC — PayPal pushes events directly; signature verified inside handler.
 * Uses express.json() (default) — PayPal does not require raw bytes for
 * its server-side verification API (unlike Stripe).
 */
paypalRouter.post("/webhook", paypalWebhook);

export default paypalRouter;
