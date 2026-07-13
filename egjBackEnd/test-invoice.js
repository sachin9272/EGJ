import "dotenv/config";
import mongoose from "mongoose";
import Booking from "./models/booking.model.js";
import { generateInvoicePDF } from "./utils/pdfGenerator.js";
import { sendEmail } from "./utils/email.js";

async function testInvoice() {
  try {
    // 1. Connect to database
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to DB");

    // 2. Find a booking to generate the invoice for
    // Sorting by -1 to get the most recent one
    console.log("Searching for a booking in the database...");
    const bookingWithTour = await Booking.findOne().populate("tour").sort({ createdAt: -1 });
    
    if (!bookingWithTour) {
      console.log("❌ No booking found in DB. Please make sure you have at least one booking created.");
      process.exit(1);
    }

    console.log(`✅ Found booking: ${bookingWithTour._id}`);
    
    // You can hardcode your email here to test receiving it directly:
    // const targetEmail = "your.email@example.com";
    // const targetEmail = bookingWithTour.mainTourist.email;
    const targetEmail = "sachinsingh9272@gmail.com"
    
    console.log(`📧 Target email address: ${targetEmail}`);
    console.log("📄 Generating PDF...");
    
    // 3. Generate PDF
    const pdfBuffer = await generateInvoicePDF(bookingWithTour);
    console.log("✅ PDF generated successfully!");

    // 4. Send Email
    console.log("📧 Sending Email...");
    await sendEmail({
      to: targetEmail,
      subject: "[TEST] Your Booking Invoice & Receipt 📄",
      html: `
        <h2>Hello ${bookingWithTour.mainTourist.firstName},</h2>
        <p><strong>NOTE: This is a TEST email.</strong></p>
        <p>Thank you for booking your adventure with Expeditions George of the Jungle!</p>
        <p>Please find attached your official booking invoice and payment receipt (PDF).</p>
        <p>We look forward to welcoming you to the jungle!</p>
        <p>Respectfully,</p>
        <p>— Expeditions George of the Jungle Team</p>
      `,
      attachments: [
        {
          filename: `Invoice-TEST-${bookingWithTour._id.toString().slice(-4).toUpperCase()}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    console.log("✅ Invoice email sent successfully!");
  } catch (error) {
    console.error("❌ Failed to generate or send invoice:", error);
  } finally {
    process.exit(0);
  }
}

testInvoice();
