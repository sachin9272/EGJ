import express from "express";
import cors from "cors";
import "dotenv/config";
import healthRoutes from "./routes/health.route.js";
import { connectDB } from "./configs/db.js";

import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.controller.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.routes.js";
import tourRouter from "./routes/tour.route.js";
import productRouter from "./routes/product.route.js";

import bookingRouter from "./routes/booking.route.js";
import checkoutRouter from "./routes/checkout.route.js";
import contactRouter from "./routes/contact.route.js";

const app = express();

await connectDB();

app.use(cors());

// --- STRIPE WEBHOOK MUST COME BEFORE express.json() ---
// We define it here so it gets the raw body which Stripe requires for signature verification
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js";
app.post("/api/v1/booking/webhook", express.raw({ type: "application/json" }), stripeWebhook);
// --------------------------------------------------------

app.use(express.json());

//ENDPOINTS
app.use("/api/clerk", clerkWebhooks); // ENDPOINT WHICH IS CALLED IN CLERK
app.use("/", healthRoutes); // ENDPOINT TO CHECK DATABASE CONNECTION

//User
app.use("/api/v1/user", clerkMiddleware(), userRouter);

//ENDPOINTS FOR ADMIN USAGE
app.use("/api/v1/users", clerkMiddleware(), adminRouter);

//ENDPOINT TOURS
app.use("/api/v1/tour", tourRouter);

//PRODUCTS FROM STRIPE ENPOINT
app.use("/api/v1/products", productRouter);
app.use("/api/v1/checkout", checkoutRouter);

//BOOKING DOCUMENTS
app.use("/api/v1/booking", clerkMiddleware(), bookingRouter);


//CONTACT FORM
app.use("/api/v1/contact", contactRouter);

//dev enviroment
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));

//Production enviroment
export default app;
