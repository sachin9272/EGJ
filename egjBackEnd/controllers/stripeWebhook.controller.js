import Stripe from "stripe";
import Booking from "../models/booking.model.js";
import { sendEmail } from "../utils/email.js";
import { generateInvoicePDF } from "../utils/pdfGenerator.js";

const stripe = new Stripe(process.env.STRIPE_API_SECRET);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  console.log("================ WEBHOOK DIAGNOSTICS ================");
  console.log("Stripe Signature Header:", sig);
  console.log("Using Webhook Secret:", process.env.STRIPE_WEBHOOK_SECRET);
  console.log("Is req.body a Buffer?", Buffer.isBuffer(req.body));
  console.log("=====================================================");

  try {
    // Verify Stripe webhook signature
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log(`✅ Webhook verified successfully. Event type: ${event.type}`);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Only trigger on successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // 1️⃣ Update booking status in MongoDB
    const bookingId = session.metadata.bookingId;
    console.log(`📌 Processing checkout.session.completed for Booking ID: ${bookingId}`);

    if (bookingId) {
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          isPaid: true,
          $unset: { expireAt: "" },
          "stripe.depositPaymentIntentId": session.payment_intent, // Update the booking with paymentIntentId and customerId
          "stripe.customerId": session.customer,
        },
        { new: true }
      );

      if (booking) {
        console.log(`✅ Booking ${bookingId} found and updated as paid. Proceeding to send emails.`);

        if (booking.paymentType === "custom") {
          // Custom "Pay Now" flow: mirrors the existing deposit flow's email
          // sequence (confirmation email, then a separate PDF invoice email),
          // but sends BOTH emails to the client AND to the admin.

          // 2️⃣ Send confirmation email to client
          try {
            console.log(`📧 Sending custom payment confirmation to client: ${booking.mainTourist.email}`);
            await sendEmail({
              to: booking.mainTourist.email,
              subject: "Payment Received — Thank You! ✅",
              html: `
                <h2>Hello ${booking.mainTourist.firstName},</h2>
                <p>We've received your payment. Here are your details:</p>
                <ul>
                  <li>Amount paid: $${booking.bookingPayment}</li>
                  ${booking.comments ? `<li>Details: ${booking.comments}</li>` : ""}
                </ul>
                <p>Thank you for choosing Expeditions George of the Jungle!</p>
              `,
            });
            console.log(`✅ Client confirmation email sent successfully.`);
          } catch (emailErr) {
            console.error("❌ Failed to send client confirmation email:", emailErr);
          }

          // 3️⃣ Send notification email to admin
          try {
            console.log(`📧 Sending custom payment notification to admin: ${process.env.ADMIN_EMAIL}`);
            await sendEmail({
              to: process.env.ADMIN_EMAIL,
              subject: "New Custom Tour Payment Received",
              html: `
                <h2>New Custom Payment!</h2>
                <p>Booking ID: ${booking._id}</p>
                <p>Client: ${booking.mainTourist.firstName} ${booking.mainTourist.surname}</p>
                <p>Email: ${booking.mainTourist.email}</p>
                <p>Phone: ${booking.mainTourist.phoneNumber}</p>
                <p>Amount paid: $${booking.bookingPayment}</p>
                ${booking.comments ? `<p>Details: ${booking.comments}</p>` : ""}
              `,
            });
            console.log(`✅ Admin notification email sent successfully.`);
          } catch (adminEmailErr) {
            console.error("❌ Failed to send admin notification email:", adminEmailErr);
          }

          // 4️⃣ Generate the invoice PDF once, then send it to BOTH client and admin
          try {
            console.log(`📄 Generating invoice PDF for booking ${booking._id}`);
            const bookingWithTour = await Booking.findById(booking._id).populate("tour");
            if (bookingWithTour) {
              const pdfBuffer = await generateInvoicePDF(bookingWithTour);
              const attachments = [
                {
                  filename: `Invoice-${bookingWithTour._id.toString().slice(-4).toUpperCase()}.pdf`,
                  content: pdfBuffer,
                  contentType: "application/pdf",
                },
              ];

              try {
                await sendEmail({
                  to: bookingWithTour.mainTourist.email,
                  subject: "Your Payment Invoice & Receipt 📄",
                  html: `
                    <h2>Hello ${bookingWithTour.mainTourist.firstName},</h2>
                    <p>Thank you for your payment to Expeditions George of the Jungle!</p>
                    <p>Please find attached your official payment invoice/receipt (PDF).</p>
                    <p>Respectfully,</p>
                    <p>— Expeditions George of the Jungle Team</p>
                  `,
                  attachments,
                });
                console.log(`✅ Invoice PDF email sent successfully to ${bookingWithTour.mainTourist.email}.`);
              } catch (clientPdfErr) {
                console.error("❌ Failed to send client invoice PDF email:", clientPdfErr);
              }

              try {
                await sendEmail({
                  to: process.env.ADMIN_EMAIL,
                  subject: "Custom Payment Invoice & Receipt 📄",
                  html: `
                    <h2>New Custom Payment — Invoice Copy</h2>
                    <p>Booking ID: ${bookingWithTour._id}</p>
                    <p>Client: ${bookingWithTour.mainTourist.firstName} ${bookingWithTour.mainTourist.surname}</p>
                    <p>Please find attached the invoice/receipt (PDF) sent to the client.</p>
                  `,
                  attachments,
                });
                console.log(`✅ Invoice PDF email sent successfully to admin.`);
              } catch (adminPdfErr) {
                console.error("❌ Failed to send admin invoice PDF email:", adminPdfErr);
              }
            } else {
              console.warn(`⚠️ Could not generate PDF: Booking details missing.`);
            }
          } catch (pdfErr) {
            console.error("❌ Error generating/sending custom payment invoice PDF:", pdfErr);
          }

          res.json({ received: true });
          return;
        }

        // 2️⃣ Send confirmation email to client
        try {
          console.log(`📧 Attempting to send confirmation email to client: ${booking.mainTourist.email}`);
          await sendEmail({
          to: booking.mainTourist.email,
          subject: "Your Booking is Confirmed ✅",
          html: `
            <h2>Hello ${booking.mainTourist.firstName},</h2>
            <p>Your booking is confirmed! Here are your details:</p>
            <ul>
              <li>Tour: ${booking.tourPackage}</li>
              <li>Total tourists: ${booking.totalTourists}</li>
              <li>Total cost: $${booking.totalCost}</li>
              <li>Deposit paid: $${booking.bookingPayment}</li>
            </ul>
            <p>Thank you for booking with us!</p>
          `,
          });
          console.log(`✅ Client confirmation email sent successfully.`);
        } catch (emailErr) {
          console.error("❌ Failed to send client confirmation email:", emailErr);
        }

        // 3️⃣ Send notification email to admin
        try {
          console.log(`📧 Attempting to send admin notification email to: ${process.env.ADMIN_EMAIL}`);
          await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: "New Booking Received",
          html: `
            <h2>New Booking!</h2>
            <p>Booking ID: ${booking._id}</p>
            <p>Client: ${booking.mainTourist.firstName} ${booking.mainTourist.surname}</p>
            <p>Tour: ${booking.tourPackage}</p>
            <p>Total tourists: ${booking.totalTourists}</p>
            <p>Deposit paid: $${booking.bookingPayment}</p>
          `,
          });
          console.log(`✅ Admin notification email sent successfully.`);
        } catch (adminEmailErr) {
          console.error("❌ Failed to send admin notification email:", adminEmailErr);
        }

        // 4️⃣ Generate and send separate Invoice PDF email
        try {
          console.log(`📄 Generating invoice PDF for booking ${booking._id}`);
          const bookingWithTour = await Booking.findById(booking._id).populate("tour");
          if (bookingWithTour) {
            const pdfBuffer = await generateInvoicePDF(bookingWithTour);
            await sendEmail({
              to: bookingWithTour.mainTourist.email,
              subject: "Your Booking Invoice & Receipt 📄",
              html: `
                <h2>Hello ${bookingWithTour.mainTourist.firstName},</h2>
                <p>Thank you for booking your adventure with Expeditions George of the Jungle!</p>
                <p>Please find attached your official booking invoice and payment receipt (PDF).</p>
                <p>We look forward to welcoming you to the jungle!</p>
                <p>Respectfully,</p>
                <p>— Expeditions George of the Jungle Team</p>
              `,
              attachments: [
                {
                  filename: `Invoice-${bookingWithTour._id.toString().slice(-4).toUpperCase()}.pdf`,
                  content: pdfBuffer,
                  contentType: "application/pdf",
                },
              ],
            });
            console.log(`✅ Invoice PDF email sent successfully to ${bookingWithTour.mainTourist.email}.`);
          } else {
            console.warn(`⚠️ Could not generate PDF: Booking or Tour details missing.`);
          }
        } catch (pdfErr) {
          console.error("❌ Error generating/sending Stripe PDF invoice:", pdfErr);
        }
      } else {
        console.warn(`⚠️ Booking ID ${bookingId} not found in database.`);
      }
    } else {
      console.warn(`⚠️ No bookingId found in session metadata.`);
    }
  } else {
    console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};
