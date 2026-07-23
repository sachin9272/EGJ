import Stripe from "stripe";
import Booking from "../models/booking.model.js";
import {
  MAXIMUM_TOURISTS,
  MINIMUM_TOURISTS,
  calculatePaymentBreakdown,
  findTourPricing,
} from "../utils/tourPricing.js";

const stripe = new Stripe(process.env.STRIPE_API_SECRET);

const CLIENT_URL = process.env.CLIENT_URL.replace(/\/+$/, "");

export const createCheckoutSession = async (req, res) => {
  try {
    const { productId, quantity = 1, userId, bookingId } = req.body;
    // Validate inputs
    if (!productId || quantity < 1 || !userId || !bookingId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1️⃣ Retrieve the Stripe product info from Stripe catalog
    const product = await stripe.products.retrieve(productId);

    // 2️⃣ Retrieve the price(s) associated with this product
    const prices = await stripe.prices.list({ product: productId });

    // 3️⃣ For simplicity, take the first price (you can adjust if you have multiple prices)
    const unitPrice = prices.data[0].unit_amount; // in cents

    // 4️⃣ Calculate 30% deposit

    const depositAmount = Math.round(unitPrice * 0.3); // Stripe expects price in cents

    // 5️⃣ Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: prices.data[0].currency, // Use currency from Stripe
            product_data: {
              name: product.name, // Name from your Stripe product
              description: `Full price per person: $${(unitPrice / 100).toFixed(
                2
              )}. Deposit to pay now: $${(depositAmount / 100).toFixed(2)}`,
              images: product.images, // Show product images from Stripe
            },
            unit_amount: depositAmount, // Charge only deposit
          },
          // tax_rates: ["txr_1RvogdCSZkTnlKztXXeRSnoC"], // manual tax rate
          quantity, // Multiply deposit by number of people
        },
      ],
      success_url: `${CLIENT_URL}/success`,
      cancel_url: `${CLIENT_URL}/`,
      metadata: {
        productId,
        userId,
        bookingId,
        fullPricePerPerson: unitPrice, // optional: save full price
        chargedPercentage: "30%",
      },
    });
    // 6️⃣ Return the URL of the Stripe Checkout page to frontend
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

export const createDirectCheckoutSession = async (req, res) => {
  try {
    const { formData } = req.body;
    const currency = "USD";

    const pricing = findTourPricing(formData?.tourPackage);
    if (!pricing) {
      return res.status(400).json({ error: "A valid tour package is required" });
    }

    const requestedTourists = pricing.fixedTotalTourists
      ? pricing.fixedTotalTourists
      : Number(formData?.totalTourists);

    if (
      !Number.isFinite(requestedTourists) ||
      requestedTourists < MINIMUM_TOURISTS ||
      requestedTourists > MAXIMUM_TOURISTS
    ) {
      return res
        .status(400)
        .json({ error: "Tour bookings require 1 to 10 people" });
    }

    const paymentBreakdown = calculatePaymentBreakdown(
      pricing.pricePerPerson,
      requestedTourists,
      { payInFull: pricing.payInFull }
    );

    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours TTL

    // Create a Booking document from the form data
    const newBooking = new Booking({
      totalCost: paymentBreakdown.totalPrice,
      bookingPayment: paymentBreakdown.dueToday,
      balance: paymentBreakdown.balance,
      totalTourists: paymentBreakdown.people,
      tourPackage: pricing.title,
      comments: formData?.message || "",
      checkIn: formData?.dates || null,
      mainTourist: {
        firstName: formData?.firstName || "Unknown",
        surname: formData?.lastName || "Unknown",
        email: formData?.email || "no-email@provided.com",
        phoneNumber: formData?.phone || "0000000000",
        nacionality: formData?.nationality || "Unknown",
      },
      expireAt,
      isPaid: false,
    });

    await newBooking.save();

    const unitPrice = pricing.pricePerPerson * 100; // in cents
    const depositAmount = Math.round(paymentBreakdown.dueToday * 100); // in cents

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: pricing.title,
              description: `Full price per person: $${(unitPrice / 100).toFixed(
                2
              )}. Deposit to pay now: $${(depositAmount / 100).toFixed(2)}`,
            },
            unit_amount: depositAmount,
          },
          // tax_rates: ["txr_1RvogdCSZkTnlKztXXeRSnoC"], // Commented out: hardcoded tax rate ID fails on new test keys
          quantity: 1, // Quantity is 1 because the deposit amount is total for all tourists based on paymentBreakdown
        },
      ],
      success_url: `${CLIENT_URL}/success`,
      cancel_url: `${CLIENT_URL}/`,
      metadata: {
        bookingId: newBooking._id.toString(),
        fullPrice: paymentBreakdown.totalPrice * 100,
        chargedPercentage: pricing.payInFull ? "100%" : "30%",
      },
    });

    res.status(200).json({ url: session.url, bookingId: newBooking._id });
  } catch (error) {
    console.error("Stripe Direct Checkout Error:", error.message);
    res.status(500).json({ error: "Failed to create direct checkout session" });
  }
};
