import Booking from "../models/booking.model.js";
import { sendEmail } from "../utils/email.js";
import {
  capturePayPalOrder,
  createPayPalOrder,
  verifyPayPalWebhook,
} from "../utils/paypal.js";
import {
  MAXIMUM_TOURISTS,
  MINIMUM_TOURISTS,
  calculatePayPalProcessingFee,
  calculatePaymentBreakdown,
  findTourPricing,
} from "../utils/tourPricing.js";

// ─── 1. CREATE PAYPAL ORDER ───────────────────────────────────────────────
/**
 * POST /api/v1/paypal/create-order
 * Body: { bookingId }
 *
 * Creates a PayPal Orders v2 order for the 30% deposit already stored on
 * the booking document, persists the PayPal order ID back to the booking,
 * and returns the PayPal approval URL so the frontend can redirect the user.
 */
export const createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ error: "bookingId is required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.isPaid) {
      return res
        .status(400)
        .json({ error: "This booking has already been paid" });
    }

    const depositAmount = booking.bookingPayment;
    const paypalProcessingFee = calculatePayPalProcessingFee(depositAmount);
    const baseCashBalance = booking.totalCost - booking.bookingPayment;
    const balanceWithPayPalCharge = baseCashBalance + paypalProcessingFee;
    const currency = process.env.PAYPAL_CURRENCY || "USD";
    const description = `${booking.totalTourists} person(s) booking deposit`;

    const order = await createPayPalOrder({
      bookingId,
      depositAmount,
      currency,
      description,
    });

    // Persist the newly created PayPal order ID so the webhook can look up
    // the booking later using only the orderId.
    await Booking.findByIdAndUpdate(bookingId, {
      "paypal.orderId": order.id,
      "paypal.status": "CREATED",
      balance: balanceWithPayPalCharge,
    });

    // The payer-action link is the URL we redirect the user to.
    const approvalUrl = order.links?.find((l) => l.rel === "payer-action")?.href;

    if (!approvalUrl) {
      throw new Error("PayPal did not return an approval URL");
    }

    return res.status(200).json({ orderId: order.id, approvalUrl });
  } catch (error) {
    console.error("PayPal Create Order Error:", error.message);
    return res.status(500).json({ error: "Failed to create PayPal order" });
  }
};

// ─── 1b. CREATE DIRECT ORDER (no booking document required previously) ──────────────
/**
 * POST /api/v1/paypal/create-direct-order
 * Body: { currency?, formData }
 *
 * Creates a Booking document with the collected form data, then creates a
 * PayPal order for the booking deposit from the 2026 pricing table.
 */
export const createDirectOrder = async (req, res) => {
  try {
    const {
      currency = process.env.PAYPAL_CURRENCY || "USD",
      formData
    } = req.body;

    const pricing = findTourPricing(formData?.tourPackage);

    if (!pricing) {
      return res.status(400).json({ error: "A valid tour package is required" });
    }

    const requestedTourists = Number(formData?.totalTourists);

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
      requestedTourists
    );

    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours TTL
    const description = `${pricing.title} booking deposit`;

    // Create a Booking document from the form data
    const newBooking = new Booking({
      totalCost: paymentBreakdown.totalPrice,
      bookingPayment: paymentBreakdown.deposit,
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

    const order = await createPayPalOrder({
      bookingId: newBooking._id.toString(), 
      depositAmount: paymentBreakdown.deposit,
      currency,
      description,
    });

    // Persist PayPal order ID back to the newly created booking
    await Booking.findByIdAndUpdate(newBooking._id, {
      "paypal.orderId": order.id,
      "paypal.status": "CREATED",
    });

    const approvalUrl = order.links?.find((l) => l.rel === "payer-action")?.href;

    if (!approvalUrl) {
      throw new Error("PayPal did not return an approval URL");
    }

    return res.status(200).json({ orderId: order.id, approvalUrl, bookingId: newBooking._id });
  } catch (error) {
    console.error("PayPal Direct Order Error:", error.message);
    return res.status(500).json({ error: "Failed to create PayPal order" });
  }
};

// ─── 2. CAPTURE ORDER (frontend return redirect) ──────────────────────────
/**
 * POST /api/v1/paypal/capture-order
 * Body: { orderId, bookingId }
 *
 * Called by the frontend /paypal/return page after PayPal redirects the user
 * back. Captures the approved order so the funds are collected.
 * The actual booking confirmation (isPaid, emails, full record) is handled
 * exclusively by the webhook to avoid race conditions.
 */
export const captureOrder = async (req, res) => {
  try {
    const { orderId, bookingId } = req.body;

    if (!orderId || !bookingId) {
      return res
        .status(400)
        .json({ error: "orderId and bookingId are required" });
    }

    // Prevent double-capture if the webhook already completed the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.paypal?.orderId !== orderId) {
      return res
        .status(400)
        .json({ error: "PayPal order does not match booking" });
    }

    if (booking.isPaid) {
      // Already confirmed by webhook — just tell the frontend it's done.
      return res.status(200).json({ captured: true, alreadyConfirmed: true });
    }

    // Update status to APPROVED while capture is in-flight
    await Booking.findByIdAndUpdate(bookingId, {
      "paypal.status": "APPROVED",
    });

    await capturePayPalOrder(orderId);

    // Mark status as CAPTURED; the webhook will finalize to COMPLETED
    await Booking.findByIdAndUpdate(bookingId, {
      "paypal.status": "CAPTURED",
    });

    return res.status(200).json({ captured: true });
  } catch (error) {
    console.error("PayPal Capture Error:", error.message);
    return res.status(500).json({ error: "Failed to capture PayPal order" });
  }
};

// ─── 3. PAYPAL WEBHOOK ────────────────────────────────────────────────────
/**
 * POST /api/v1/paypal/webhook
 * Raw JSON body (no Clerk auth, PayPal pushes events here directly)
 *
 * Handles:
 *  • PAYMENT.CAPTURE.COMPLETED → stores full transaction record, marks
 *    booking as paid, clears TTL, sends confirmation + admin emails.
 *  • PAYMENT.CAPTURE.DENIED    → marks paypal.status = FAILED.
 */
export const paypalWebhook = async (req, res) => {
  // ── Verify signature ──────────────────────────────────────────────────
  const isValid = await verifyPayPalWebhook({
    authAlgo: req.headers["paypal-auth-algo"],
    certUrl: req.headers["paypal-cert-url"],
    transmissionId: req.headers["paypal-transmission-id"],
    transmissionSig: req.headers["paypal-transmission-sig"],
    transmissionTime: req.headers["paypal-transmission-time"],
    webhookBody: req.body, // express.json() has already parsed this
  });

  if (!isValid) {
    console.error("PayPal webhook: invalid signature");
    return res.status(400).json({ error: "Invalid webhook signature" });
  }

  const event = req.body;
  const eventType = event.event_type;

  console.log(`PayPal webhook received: ${eventType}`);

  // ── PAYMENT.CAPTURE.COMPLETED ─────────────────────────────────────────
  if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
    try {
      const capture = event.resource; // the capture object from PayPal

      // custom_id echoes back the bookingId we set when creating the order.
      // It lives inside purchase_units[0] of the FULL order, but PayPal also
      // exposes it on the capture's supplementary_data. Fall back to orderId
      // lookup if needed.
      const bookingIdFromCustom =
        capture.custom_id ||
        capture.supplementary_data?.related_ids?.custom_id;

      const orderId =
        capture.supplementary_data?.related_ids?.order_id ||
        capture.id; // last resort

      let booking = null;

      if (bookingIdFromCustom) {
        booking = await Booking.findById(bookingIdFromCustom);
      }

      // Fallback: locate via the PayPal order ID we stored when creating the order
      if (!booking && orderId) {
        booking = await Booking.findOne({ "paypal.orderId": orderId });
      }

      if (!booking) {
        console.error(
          "PayPal webhook: could not locate booking for capture",
          capture.id
        );
        return res.status(200).json({ received: true }); // always 200 to PayPal
      }

      // Guard against duplicate webhook deliveries
      if (booking.isPaid) {
        console.log(
          `PayPal webhook: booking ${booking._id} already marked paid — skipping`
        );
        return res.status(200).json({ received: true });
      }

      // ── Build full transaction record ──────────────────────────────────
      const payer = capture.payer || {};
      const payerName = [payer.name?.given_name, payer.name?.surname]
        .filter(Boolean)
        .join(" ");

      const updatedBooking = await Booking.findByIdAndUpdate(
        booking._id,
        {
          isPaid: true,
          $unset: { expireAt: "" }, // remove TTL so doc is kept forever

          // Full PayPal transaction record
          "paypal.captureId": capture.id,
          "paypal.orderId": orderId || booking.paypal?.orderId,
          "paypal.payerEmail": payer.email_address || "",
          "paypal.payerName": payerName,
          "paypal.payerId": payer.payer_id || "",
          "paypal.amount": parseFloat(capture.amount?.value ?? 0),
          "paypal.currency": capture.amount?.currency_code || "",
          "paypal.status": "COMPLETED",
          "paypal.capturedAt": new Date(),
        },
        { new: true }
      );
      const paypalProcessingFee = Math.max(
        0,
        updatedBooking.balance -
          (updatedBooking.totalCost - updatedBooking.bookingPayment)
      );

      // ── Confirmation email to client ───────────────────────────────────
      await sendEmail({
        to: updatedBooking.mainTourist.email,
        subject: "Your Booking is Confirmed ✅",
        html: `
          <h2>Hello ${updatedBooking.mainTourist.firstName},</h2>
          <p>Great news — your payment via PayPal was successful and your booking is now confirmed!</p>
          <ul>
            <li><strong>Tour:</strong> ${updatedBooking.tourPackage || updatedBooking.tour}</li>
            <li><strong>Total tourists:</strong> ${updatedBooking.totalTourists}</li>
            <li><strong>Total cost:</strong> $${updatedBooking.totalCost}</li>
            <li><strong>Booking deposit paid:</strong> ${updatedBooking.paypal.currency} ${updatedBooking.paypal.amount}</li>
            <li><strong>PayPal charge added to cash balance:</strong> ${updatedBooking.paypal.currency} ${paypalProcessingFee}</li>
            <li><strong>Remaining balance:</strong> ${updatedBooking.paypal.currency} ${updatedBooking.balance} cash only at the office</li>
            <li><strong>PayPal Capture ID:</strong> ${updatedBooking.paypal.captureId}</li>
          </ul>
          <p>The PayPal charge is shown separately and added to your remaining cash balance.</p>
          <p>Thank you for choosing Expeditions George of the Jungle!</p>
        `,
      });

      // ── Notification email to admin ────────────────────────────────────
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "New Booking Received (PayPal)",
        html: `
          <h2>New PayPal Booking!</h2>
          <p><strong>Booking ID:</strong> ${updatedBooking._id}</p>
          <p><strong>Client:</strong> ${updatedBooking.mainTourist.firstName} ${updatedBooking.mainTourist.surname}</p>
          <p><strong>Email:</strong> ${updatedBooking.mainTourist.email}</p>
          <p><strong>Tour:</strong> ${updatedBooking.tourPackage || updatedBooking.tour}</p>
          <p><strong>Total tourists:</strong> ${updatedBooking.totalTourists}</p>
          <p><strong>Deposit paid:</strong> ${updatedBooking.paypal.currency} ${updatedBooking.paypal.amount}</p>
          <p><strong>PayPal charge added to cash balance:</strong> ${updatedBooking.paypal.currency} ${paypalProcessingFee}</p>
          <p><strong>Remaining balance:</strong> ${updatedBooking.paypal.currency} ${updatedBooking.balance} cash only at the office</p>
          <p><strong>PayPal Payer:</strong> ${updatedBooking.paypal.payerName} (${updatedBooking.paypal.payerEmail})</p>
          <p><strong>PayPal Capture ID:</strong> ${updatedBooking.paypal.captureId}</p>
        `,
      });

      console.log(
        `PayPal webhook: booking ${booking._id} confirmed. Capture: ${capture.id}`
      );
    } catch (err) {
      console.error("PayPal webhook PAYMENT.CAPTURE.COMPLETED error:", err.message);
      // Return 200 so PayPal doesn't retry indefinitely; log for investigation
    }
  }

  // ── PAYMENT.CAPTURE.DENIED ────────────────────────────────────────────
  if (eventType === "PAYMENT.CAPTURE.DENIED") {
    try {
      const capture = event.resource;
      const orderId = capture.supplementary_data?.related_ids?.order_id;

      if (orderId) {
        await Booking.findOneAndUpdate(
          { "paypal.orderId": orderId },
          { "paypal.status": "FAILED" }
        );
        console.warn(`PayPal webhook: capture DENIED for order ${orderId}`);
      }
    } catch (err) {
      console.error("PayPal webhook PAYMENT.CAPTURE.DENIED error:", err.message);
    }
  }

  return res.status(200).json({ received: true });
};
