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
  calculateBookingDeposit,
  calculatePayPalProcessingFee,
  calculatePaymentBreakdown,
  findTourPricing,
} from "../utils/tourPricing.js";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getBookingRecipients = () => {
  const recipients =
    process.env.CONTACT_EMAIL_TO || process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  return recipients
    ?.split(",")
    .map((email) => email.trim())
    .filter(Boolean);
};

const formatDate = (value) => {
  if (!value) return "Not provided";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not provided";

  return date.toISOString().slice(0, 10);
};

const formatMoney = (currency, value) =>
  `${escapeHtml(currency || "USD")} ${Number(value || 0).toFixed(2)}`;

const bookingRow = (label, value) => `
  <tr>
    <td style="padding:12px 0;border-bottom:1px solid rgba(244,238,217,0.16);">
      <p style="margin:0 0 5px;font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:#d9b650;">${escapeHtml(label)}</p>
      <p style="margin:0;font-size:16px;line-height:1.5;color:#f4eed9;word-break:break-word;">${escapeHtml(value ?? "Not provided")}</p>
    </td>
  </tr>
`;

const invoiceLine = (label, value, highlight = false) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid rgba(244,238,217,0.14);font-size:14px;line-height:1.45;color:rgba(244,238,217,0.78);">${escapeHtml(label)}</td>
    <td align="right" style="padding:10px 0;border-bottom:1px solid rgba(244,238,217,0.14);font-size:${highlight ? "18px" : "14px"};line-height:1.45;font-weight:${highlight ? "800" : "700"};color:${highlight ? "#d9b650" : "#f4eed9"};">${escapeHtml(value)}</td>
  </tr>
`;

const getCaptureDetails = ({ capture, captureOrder, booking }) => {
  const orderCapture =
    captureOrder?.purchase_units?.[0]?.payments?.captures?.[0] || {};
  const orderUnit = captureOrder?.purchase_units?.[0] || {};
  const payer = captureOrder?.payer || capture?.payer || {};
  const selectedCapture = capture || orderCapture;
  const orderId =
    captureOrder?.id ||
    selectedCapture.supplementary_data?.related_ids?.order_id ||
    booking.paypal?.orderId;
  const payerName = [
    payer.name?.given_name,
    payer.name?.surname,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    captureId: selectedCapture.id,
    orderId,
    payerEmail: payer.email_address || "",
    payerName,
    payerId: payer.payer_id || "",
    amount: parseFloat(
      selectedCapture.amount?.value ??
        orderUnit.amount?.value ??
        booking.bookingPayment ??
        0
    ),
    currency:
      selectedCapture.amount?.currency_code ||
      orderUnit.amount?.currency_code ||
      process.env.PAYPAL_CURRENCY ||
      "USD",
  };
};

const buildInvoiceEmail = ({ booking, title, intro, audience }) => {
  const currency = booking.paypal.currency || process.env.PAYPAL_CURRENCY || "USD";
  const paypalProcessingFee =
    booking.balance === 0 && booking.bookingPayment === booking.totalCost
      ? 0
      : Math.max(
          0,
          booking.bookingPayment - calculateBookingDeposit(booking.totalCost)
        );
  const rows = [
    ["Booking ID", booking._id],
    ["Tour package", booking.tourPackage || booking.tour],
    ["Tour date", formatDate(booking.checkIn)],
    ["Group size", `${booking.totalTourists} people`],
    ["First name", booking.mainTourist.firstName],
    ["Last name", booking.mainTourist.surname],
    ["Email", booking.mainTourist.email],
    ["Phone | Whatsapp", booking.mainTourist.phoneNumber],
    ["Nationality", booking.mainTourist.nacionality],
    ["Message", booking.comments],
    ["PayPal payer", `${booking.paypal.payerName || "Not provided"} (${booking.paypal.payerEmail || "Not provided"})`],
    ["PayPal order ID", booking.paypal.orderId],
    ["PayPal capture ID", booking.paypal.captureId],
  ];

  return `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          @media only screen and (max-width: 620px) {
            .egj-shell { padding: 14px !important; }
            .egj-card { border-radius: 14px !important; }
            .egj-hero { padding: 24px 18px !important; }
            .egj-body { padding: 20px 18px !important; }
            .egj-title { font-size: 26px !important; }
            .egj-grid td { display: block !important; width: 100% !important; }
            .egj-total td { display: table-cell !important; }
          }
        </style>
      </head>
      <body style="margin:0;padding:0;background:#061008;font-family:Arial,Helvetica,sans-serif;color:#f4eed9;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="egj-shell" style="background:#061008;padding:28px 14px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="egj-card" style="max-width:760px;overflow:hidden;border:1px solid rgba(244,238,217,0.28);border-radius:18px;background:#10180d;">
                <tr>
                  <td class="egj-hero" style="padding:32px 30px;background:linear-gradient(135deg,#173d20 0%,#6f921e 58%,#d9b650 100%);">
                    <p style="margin:0 0 10px;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#fff;">Expeditions George of the Jungle</p>
                    <h1 class="egj-title" style="margin:0;font-size:34px;line-height:1.12;color:#ffffff;">${escapeHtml(title)}</h1>
                    <p style="margin:12px 0 0;font-size:16px;line-height:1.6;color:#fff;">${escapeHtml(intro)}</p>
                  </td>
                </tr>
                <tr>
                  <td class="egj-body" style="padding:28px 30px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="egj-total" style="margin:0 0 22px;">
                      ${invoiceLine("Total tour price", formatMoney(currency, booking.totalCost))}
                      ${invoiceLine("Paid online by PayPal", formatMoney(currency, booking.paypal.amount), true)}
                      ${invoiceLine("PayPal fee included", formatMoney(currency, paypalProcessingFee))}
                      ${invoiceLine("Remaining cash balance", formatMoney(currency, booking.balance))}
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      ${rows.map(([label, value]) => bookingRow(label, value)).join("")}
                    </table>

                    <p style="margin:24px 0 0;font-size:14px;line-height:1.7;color:rgba(244,238,217,0.74);">
                      ${audience === "admin"
                        ? "This admin invoice was sent after PayPal confirmed the payment capture."
                        : "Your booking is confirmed. Our team will contact you with full itinerary details."}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

const sendBookingInvoiceEmails = async (booking) => {
  await sendEmail({
    to: booking.mainTourist.email,
    subject: `Your booking is confirmed - ${booking.tourPackage || "Expedition"}`,
    html: buildInvoiceEmail({
      booking,
      title: "Payment Confirmed",
      intro: "Your PayPal payment was successful and your booking reservation is confirmed.",
      audience: "customer",
    }),
  });

  const bookingRecipients = getBookingRecipients();

  if (!bookingRecipients?.length) {
    console.error("PayPal booking email skipped: no admin recipient configured.");
    return;
  }

  await sendEmail({
    to: bookingRecipients.join(","),
    replyTo: booking.mainTourist.email,
    subject: `Paid tour booking invoice - ${booking.tourPackage || "Expedition"}`,
    html: buildInvoiceEmail({
      booking,
      title: "Paid Tour Booking",
      intro: "A customer completed a PayPal payment. The full booking invoice is below.",
      audience: "admin",
    }),
  });
};

const finalizePaidBooking = async ({ booking, capture, captureOrder }) => {
  if (booking.isPaid) return { booking, alreadyConfirmed: true };

  const captureDetails = getCaptureDetails({ capture, captureOrder, booking });
  const updatedBooking = await Booking.findByIdAndUpdate(
    booking._id,
    {
      isPaid: true,
      $unset: { expireAt: "" },
      "paypal.captureId": captureDetails.captureId,
      "paypal.orderId": captureDetails.orderId,
      "paypal.payerEmail": captureDetails.payerEmail,
      "paypal.payerName": captureDetails.payerName,
      "paypal.payerId": captureDetails.payerId,
      "paypal.amount": captureDetails.amount,
      "paypal.currency": captureDetails.currency,
      "paypal.status": "COMPLETED",
      "paypal.capturedAt": new Date(),
    },
    { new: true }
  );

  await sendBookingInvoiceEmails(updatedBooking);

  return { booking: updatedBooking, alreadyConfirmed: false };
};

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
    const description = `${pricing.title} booking reservation`;

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

    const order = await createPayPalOrder({
      bookingId: newBooking._id.toString(), 
      depositAmount: paymentBreakdown.dueToday,
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
 * Captures the payment, marks the booking paid, and sends confirmation
 * invoice emails. The webhook remains a duplicate-safe backup.
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

    const captureOrder = await capturePayPalOrder(orderId);
    const { alreadyConfirmed } = await finalizePaidBooking({
      booking,
      captureOrder,
    });

    return res.status(200).json({ captured: true, alreadyConfirmed });
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

      await finalizePaidBooking({ booking, capture });

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
