import express from "express";
import { createCheckoutSession, createDirectCheckoutSession } from "../controllers/checkoutController.js";

const checkoutRouter = express.Router();
checkoutRouter.post("/", createCheckoutSession);
checkoutRouter.post("/create-direct-session", createDirectCheckoutSession);

export default checkoutRouter;
