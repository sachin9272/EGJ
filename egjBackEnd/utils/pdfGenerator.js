import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logoPath = join(__dirname, "Logo.png");

// Helpers for formatting dates
function formatLongDate(dateInput) {
  if (!dateInput) return "N/A";
  const date = new Date(dateInput);
  const options = { year: "numeric", month: "long", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
}

function formatFlightDate(dateInput) {
  if (!dateInput) return "N/A";
  const date = new Date(dateInput);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  
  return `${dayName} ${day} ${monthName} ${hours}:${minutes}`;
}

function getTourDurationInNights(name) {
  if (!name) return 0;
  const normalized = name.toLowerCase();
  if (normalized.includes("ayahuasca")) return 1;
  const match = name.match(/(\d+)\s*day/i);
  if (match) {
    const days = parseInt(match[1], 10);
    return Math.max(0, days - 1);
  }
  return 0;
}

function formatDateRange(checkIn, checkOut, tourPackageName) {
  if (!checkIn) return "N/A";
  const start = new Date(checkIn);
  let end = checkOut ? new Date(checkOut) : null;
  
  if (!end) {
    const duration = getTourDurationInNights(tourPackageName);
    end = new Date(start);
    end.setDate(start.getDate() + duration);
  }
  
  const formatMonth = (date) => date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const formatYear = (date) => date.getFullYear();
  
  const startMonth = formatMonth(start);
  const endMonth = formatMonth(end);
  const startDay = String(start.getDate()).padStart(2, "0");
  const endDay = String(end.getDate()).padStart(2, "0");
  const year = formatYear(start);
  
  if (startMonth === endMonth) {
    if (startDay === endDay) {
      return `${startMonth} ${startDay}/${year}`;
    }
    return `${startMonth} ${startDay}-${endDay}/${year}`;
  } else {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}/${year}`;
  }
}

/**
 * Generates a PDF invoice buffer for the given booking.
 * @param {object} booking - The populated Booking document.
 * @returns {Promise<Buffer>} - The generated PDF buffer.
 */
export function generateInvoicePDF(booking) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 40 });
      const chunks = [];
      
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));
      
      // Page size is A4: 595.28 x 841.89
      
      // 1. Draw top header shapes
      // Vibrant green slanted banner on top left
      doc.moveTo(0, 0)
         .lineTo(270, 0)
         .lineTo(220, 60)
         .lineTo(0, 60)
         .closePath()
         .fill("#43c072");
         
      // Dark green slanted bar on top right
      doc.moveTo(290, 0)
         .lineTo(595.28, 0)
         .lineTo(595.28, 15)
         .lineTo(277.5, 15)
         .closePath()
         .fill("#14532d");
         
      // 2. Logo image
      try {
        doc.image(logoPath, 40, 80, { width: 115 });
      } catch (imgErr) {
        console.error("Failed to load logo image in PDF, drawing text fallback:", imgErr);
        doc.fillColor("#43c072")
           .font("Helvetica-Bold")
           .fontSize(14)
           .text("EXPEDITIONS GEORGE OF THE JUNGLE", 40, 80);
      }
      
      // 3. Company details below logo
      const companyY = 145;
      doc.fillColor("#222222")
         .font("Helvetica")
         .fontSize(9)
         .text("JORGE GUDMAN VELA PIPA", 40, companyY, { lineGap: 2 })
         .text("EXPEDITIONS GEORGE OF THE JUNGLE", { lineGap: 2 })
         .text("ADDRESS: CRA. 9-8-37 BARRIO CENTRO | LETICIA, AM- COLOMBIA", { lineGap: 2 })
         .fillColor("#0066cc")
         .text("https://www.expeditionsgeorgeofthejungle.com/", { underline: true });
         
      // 4. Invoice Title & Details (Right Side)
      doc.fillColor("#000000")
         .font("Helvetica-Bold")
         .fontSize(28)
         .text("INVOICE", 350, 80, { width: 205, align: "right" });
         
      const invoiceNo = booking._id.toString().slice(-4).toUpperCase();
      const issuedDate = formatLongDate(booking.paypal?.capturedAt || booking.createdAt || new Date());
      
      // Due date is Issued + 1 day
      const issuedDateObj = new Date(booking.paypal?.capturedAt || booking.createdAt || new Date());
      const dueDateObj = new Date(issuedDateObj);
      dueDateObj.setDate(issuedDateObj.getDate() + 1);
      const dueDate = formatLongDate(dueDateObj);
      
      doc.font("Helvetica")
         .fontSize(10)
         .fillColor("#222222")
         .text(`Invoice #${invoiceNo}`, 350, 115, { width: 205, align: "right", lineGap: 3 })
         .text(`Issued: ${issuedDate}`, { width: 205, align: "right", lineGap: 3 })
         .text(`Due: ${dueDate}`, { width: 205, align: "right" });
         
      // 5. Booking Status Banner
      const statusY = 220;
      doc.fillColor("#00a859")
         .font("Helvetica-Bold")
         .fontSize(14)
         .text("BOOKING RESERVATION PAID", 40, statusY, { width: 515, align: "right" });
         
      // Subtitle below status
      const totalCost = booking.totalCost || 0;
      const totalTourists = booking.totalTourists || 1;
      const isPayPal = !!booking.paypal && !!booking.paypal.amount;
      const totalPaid = isPayPal ? booking.paypal.amount : booking.bookingPayment;
      const currency = isPayPal ? (booking.paypal.currency || "USD") : "USD";
      
      const mainName = `${booking.mainTourist.firstName} ${booking.mainTourist.surname}`.toUpperCase();
      const tourPackageName = (booking.tourPackage || (booking.tour && booking.tour.name) || "Jungle Tour").toUpperCase();
      
      doc.fillColor("#000000")
         .font("Helvetica-Bold")
         .fontSize(9.5)
         .text(`${mainName} – ${tourPackageName} | EGJ BOOKING CONFIRMATION PAID: $${totalPaid.toFixed(2)}`, 40, statusY + 20, { width: 515, align: "right" });
         
      // 6. Tourists List (Left column, y starts at 270)
      let currentY = 265;
      doc.fillColor("#000000")
         .font("Helvetica-Bold")
         .fontSize(10.5)
         .text("TOURISTS INFORMATION", 40, currentY);
      currentY += 18;
      
      // Main Tourist
      doc.font("Helvetica-Bold")
         .fontSize(9.5)
         .text(`1. Tourist Full Name: ${booking.mainTourist.firstName} ${booking.mainTourist.surname}`, 40, currentY);
      currentY += 13;
      
      const passportNo = booking.mainTourist.passportNumber || "N/A";
      const nationalityName = booking.mainTourist.nacionality || "Unknown";
      doc.font("Helvetica")
         .fillColor("#555555")
         .text(`Passport # & Nationality: ${passportNo} ${nationalityName}`, 40, currentY);
      currentY += 18;
      
      // Additional Tourists
      if (booking.additionalTourist && booking.additionalTourist.length > 0) {
        booking.additionalTourist.forEach((tourist, idx) => {
          doc.fillColor("#000000")
             .font("Helvetica-Bold")
             .text(`${idx + 2}. Tourist Full Name: ${tourist.firstName} ${tourist.surname}`, 40, currentY);
          currentY += 13;
          
          const addPassport = tourist.passportNumber || "N/A";
          const addNat = tourist.nacionality || "Unknown";
          doc.font("Helvetica")
             .fillColor("#555555")
             .text(`Passport # & Nationality: ${addPassport} ${addNat}`, 40, currentY);
          currentY += 18;
        });
      }
      
      currentY += 10;
      
      // 7. Flight details (Left) & Financial summary (Right) Side-by-Side
      const sideBySideY = currentY;
      
      // Draw Left Column: Flight & Hotel Details
      doc.fillColor("#000000");
      
      const arrivalDateStr = formatFlightDate(booking.mainTourist.flightInformation?.arrival?.date);
      const arrivalFlight = booking.mainTourist.flightInformation?.arrival?.flightNumber || "N/A";
      const departureDateStr = formatFlightDate(booking.mainTourist.flightInformation?.departure?.date);
      const departureFlight = booking.mainTourist.flightInformation?.departure?.flightNumber || "N/A";
      const hotelName = booking.mainTourist.hotel || "N/A";
      
      let leftY = sideBySideY;
      doc.font("Helvetica-Bold")
         .text("Arrival Time & Flight Number: ", 40, leftY, { continued: true })
         .font("Helvetica")
         .text(`${arrivalDateStr} | ${arrivalFlight}`);
      leftY += 16;
         
      doc.font("Helvetica-Bold")
         .text("Departure Time & Flight Number: ", 40, leftY, { continued: true })
         .font("Helvetica")
         .text(`${departureDateStr} | ${departureFlight}`);
      leftY += 16;
         
      doc.font("Helvetica-Bold")
         .text("Hotel: ", 40, leftY, { continued: true })
         .font("Helvetica")
         .text(hotelName);
      leftY += 16;
      
      // Draw Right Column: Financial details
      let rightY = sideBySideY;
      
      const fee = isPayPal ? (booking.paypal.fee || (totalPaid * 0.045)) : 0;
      const netAmount = isPayPal ? (booking.paypal.netAmount || (totalPaid - fee)) : totalPaid;
      
      doc.font("Helvetica-Bold")
         .text("TOTAL: ", 280, rightY, { width: 170, align: "right" })
         .font("Helvetica")
         .text(`$${totalPaid.toFixed(2)} ${currency}`, 450, rightY, { width: 105, align: "right" });
      rightY += 16;
      
      if (isPayPal) {
        doc.font("Helvetica-Bold")
           .text("PayPal Transfer Fee: ", 280, rightY, { width: 170, align: "right" })
           .font("Helvetica")
           .text(`-$${fee.toFixed(2)} ${currency}`, 450, rightY, { width: 105, align: "right" });
        rightY += 16;
           
        doc.font("Helvetica-Bold")
           .text("Net Amount Received: ", 280, rightY, { width: 170, align: "right" })
           .font("Helvetica")
           .text(`$${netAmount.toFixed(2)} ${currency}`, 450, rightY, { width: 105, align: "right" });
        rightY += 16;
      } else {
        doc.font("Helvetica-Bold")
           .text("Stripe Fee: ", 280, rightY, { width: 170, align: "right" })
           .font("Helvetica")
           .text(`$0.00 ${currency}`, 450, rightY, { width: 105, align: "right" });
        rightY += 16;
           
        doc.font("Helvetica-Bold")
           .text("Net Amount Received: ", 280, rightY, { width: 170, align: "right" })
           .font("Helvetica")
           .text(`$${netAmount.toFixed(2)} ${currency}`, 450, rightY, { width: 105, align: "right" });
        rightY += 16;
      }
      
      currentY = Math.max(leftY, rightY) + 20;
      
      // Divider line
      doc.moveTo(40, currentY)
         .lineTo(555.28, currentY)
         .strokeColor("#e0e0e0")
         .lineWidth(0.8)
         .stroke();
      currentY += 18;
      
      // 8. Seller's Note Box
      doc.fillColor("#000000")
         .font("Helvetica-Bold")
         .fontSize(10)
         .text("SELLER’S NOTE TO CUSTOMER & PAYMENT DESCRIPTION", 40, currentY);
      currentY += 16;
      
      const checkInDate = booking.checkIn;
      const checkOutDate = booking.checkOut;
      const travelDates = formatDateRange(checkInDate, checkOutDate, booking.tourPackage || (booking.tour && booking.tour.name));
      const pricePerPerson = Math.round(totalCost / totalTourists);
      const pdfBalance = totalCost - netAmount;
      const USD_TO_COP_RATE = 3900;
      const copBalance = Math.round(pdfBalance * USD_TO_COP_RATE / 1000);
      const copBalanceFormatted = copBalance.toLocaleString("en-US");
      
      const noteLine1 = `${tourPackageName} | DATE: ${travelDates}`;
      let noteLine2 = "";
      if (isPayPal) {
        noteLine2 = `USD $${pricePerPerson} x ${totalTourists} = $${totalCost} - 30% = USD $${Math.round(netAmount)} (30% booking deposit + 8% PayPal transfer fee)`;
      } else {
        noteLine2 = `USD $${pricePerPerson} x ${totalTourists} = $${totalCost} - 30% = USD $${Math.round(netAmount)} (30% booking deposit)`;
      }
      const noteLine3 = `Balance: USD $${Math.round(pdfBalance)} | COP ${copBalanceFormatted} (balance must pay at the office, own currency and cash only)`;
      
      doc.font("Helvetica")
         .fontSize(9.5)
         .fillColor("#333333")
         .text(noteLine1, 40, currentY, { lineGap: 3 })
         .font("Helvetica-Bold")
         .fillColor("#000000")
         .text(noteLine2, { lineGap: 3 })
         .text(noteLine3);
      currentY += 50;
      
      // 9. Seller's Terms & Conditions
      doc.fillColor("#000000")
         .font("Helvetica-Bold")
         .fontSize(10)
         .text("Seller’s Terms & Conditions", 40, currentY);
      currentY += 15;
      
      const termsText = "On behalf of the EGJ team, we extend our sincere gratitude for choosing us for your expedition. We kindly request that payment be made at your earliest convenience. Please note that your invoice is valid for 24 hours; if payment is not received within this timeframe, the invoice will be cancelled.";
      doc.font("Helvetica")
         .fontSize(8.5)
         .fillColor("#555555")
         .text(termsText, 40, currentY, { width: 515, align: "justify", lineGap: 2.5 });
      currentY += 38;
      
      // Closing
      doc.fillColor("#222222")
         .font("Helvetica")
         .fontSize(9)
         .text("Respectfully,", 40, currentY, { lineGap: 2 })
         .font("Helvetica-Bold")
         .text("— Expeditions George of the Jungle Team", { lineGap: 2 })
         .font("Helvetica")
         .fillColor("#666666")
         .text("Office Address: Cra. 9 # 8-37, Barrio Centro | Leticia, Amazonas – Colombia");
         
      // 10. Bottom Banner Shape
      doc.rect(0, 810, 595.28, 32)
         .fill("#43c072");
         
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
