import express from "express";
import {
  createCheckoutSession,
  createDirectCheckoutSession,
  createCustomPaymentSession,
} from "../controllers/checkoutController.js";

const checkoutRouter = express.Router();
checkoutRouter.post("/", createCheckoutSession);
checkoutRouter.post("/create-direct-session", createDirectCheckoutSession);
checkoutRouter.post("/create-custom-payment-session", createCustomPaymentSession);

export default checkoutRouter;
