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
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options).toUpperCase();
}

function formatFlightDate(dateInput) {
  if (!dateInput) return "N/A";
  const date = new Date(dateInput);
  return date.toLocaleDateString("en-US", { hour: '2-digit', minute:'2-digit' }) + " on the " + date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' });
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

export function generateInvoicePDF(booking) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 40 });
      const chunks = [];
      
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));
      
      // Page size is A4: 595.28 x 841.89
      
      // 1. Logo
      try {
        doc.image(logoPath, 40, 40, { width: 140 });
      } catch (imgErr) {
        doc.fillColor("#43c072")
           .font("Helvetica-Bold")
           .fontSize(14)
           .text("EXPEDITIONS GEORGE OF THE JUNGLE", 40, 40);
      }
      
      // 2. INVOICE Box
      doc.rect(260, 40, 300, 50).fill("#3ab54a");
      doc.fillColor("#ffffff")
         .font("Helvetica-Bold")
         .fontSize(32)
         .text("INVOICE", 260, 50, { width: 300, align: "center" });
         
      // 3. Invoice No & Date
      const invoiceNo = booking._id ? booking._id.toString().slice(-4).toUpperCase() : "0000";
      const issuedDate = formatLongDate(booking.stripe?.capturedAt || booking.createdAt || new Date());
      
      doc.fillColor("#333333")
         .font("Helvetica-Bold")
         .fontSize(10)
         .text(`Invoice No. ${invoiceNo}`, 260, 95, { width: 300, align: "right", lineGap: 2 })
         .font("Helvetica")
         .text(`Date: ${issuedDate}`, { width: 300, align: "right" });

      // 4. Company Info
      const companyY = 130;
      doc.fillColor("#222222")
         .font("Helvetica-Bold")
         .fontSize(10)
         .text("JORGE GUDMANN VELA PIPA", 40, companyY, { lineGap: 2 })
         .font("Helvetica")
         .text("EXPEDITIONS GEORGE OF THE JUNGLE", { lineGap: 2 })
         .text("ADDRESS: Cra 9 # 8 - 37| Barrio Centro, Leticia, Amazonas Colombia", { lineGap: 2 })
         .text("https://www.expeditionsgeorgeofthejungle.com");
         
      // 5. Status Banner
      const statusY = 190;
      doc.fillColor("#3ab54a")
         .font("Helvetica-Bold")
         .fontSize(11)
         .text("TOUR GROUP | BOOKING RESERVATION PAID", 50, statusY, { continued: true });
         
      const totalCost = booking.totalCost || 0;
      const totalPaid = booking.bookingPayment || 0;
      const currency = "USD";
      
      doc.text(`$${totalCost.toFixed(2)}`, { align: "right" });
         
      // 6. Tourist Info
      let currentY = 220;
      
      const arrivalDateStr = formatFlightDate(booking.mainTourist?.flightInformation?.arrival?.date);
      const arrivalFlight = booking.mainTourist?.flightInformation?.arrival?.flightNumber || "";
      const departureDateStr = formatFlightDate(booking.mainTourist?.flightInformation?.departure?.date);
      const departureFlight = booking.mainTourist?.flightInformation?.departure?.flightNumber || "";
      const hotelName = booking.mainTourist?.hotel || "";
      const passportNo = booking.mainTourist?.passportNumber || "N/A";
      const nationalityName = booking.mainTourist?.nacionality || "Unknown";
      const firstName = booking.mainTourist?.firstName || "Unknown";
      const lastName = booking.mainTourist?.surname || "";

      doc.fillColor("#444444")
         .font("Helvetica")
         .fontSize(10)
         .text(`1. Tourist Full Name: ${firstName} ${lastName}`, 40, currentY, { lineGap: 4 })
         .text(`• Passport Number: ${passportNo}, ${nationalityName}`, { indent: 10, lineGap: 4 })
         .text(`• Arrival Time & Flight Number: ${arrivalDateStr} ${arrivalFlight}`, { indent: 10, lineGap: 4 })
         .text(`• Departure Time & Flight Number: ${departureDateStr} ${departureFlight}`, { indent: 10, lineGap: 4 })
         .text(`• Hotel Accommodation Address: ${hotelName}`, { indent: 10, lineGap: 4 });
         
      currentY = doc.y;

      if (booking.additionalTourist && booking.additionalTourist.length > 0) {
        booking.additionalTourist.forEach((tourist, idx) => {
          const addPassport = tourist.passportNumber || "N/A";
          const addNat = tourist.nacionality || "Unknown";
          doc.text(`${idx + 2}. Tourist Full Name: ${tourist.firstName} ${tourist.surname}`, 40, currentY, { lineGap: 4 })
             .text(`• Passport Number: ${addPassport}, ${addNat}`, { indent: 10, lineGap: 4 });
          currentY = doc.y;
        });
      }
      
      currentY += 15;
      
      // 7. Financial Summary
      doc.fillColor("#222222")
         .font("Helvetica-Bold")
         .fontSize(10)
         .text(`TOTAL TOUR PRICE: ${currency} $${totalCost.toFixed(2)}`, 260, currentY, { align: "right", lineGap: 3 })
         .font("Helvetica")
         .text(`PAID ONLINE BY STRIPE: ${currency} $${totalPaid.toFixed(2)}`, { align: "right", lineGap: 3 });
      
      currentY = doc.y;
      
      const pdfBalance = totalCost - totalPaid;
      doc.fillColor("#3ab54a")
         .font("Helvetica-Bold")
         .text(`REMAINING CASH BALANCE: ${currency} $${pdfBalance.toFixed(2)}`, 260, currentY, { align: "right" });
         
      currentY = doc.y + 25;
      
      // 8. Tour Description
      const tourPackageName = (booking.tourPackage || (booking.tour && booking.tour.name) || "Jungle Tour").toUpperCase();
      const checkInDate = booking.checkIn;
      const checkOutDate = booking.checkOut;
      const travelDates = formatDateRange(checkInDate, checkOutDate, booking.tourPackage || (booking.tour && booking.tour.name));
      const USD_TO_COP_RATE = 3900;
      const copBalance = Math.round(pdfBalance * USD_TO_COP_RATE / 1000);
      const copBalanceFormatted = copBalance.toLocaleString("en-US");

      doc.fillColor("#222222")
         .font("Helvetica-Bold")
         .fontSize(10)
         .text("TOUR DESCRIPTION", 40, currentY, { lineGap: 3 })
         .text(`${tourPackageName} | DATE: ${travelDates}`, { lineGap: 3 })
         .font("Helvetica")
         .text(`${currency} $${totalCost.toFixed(2)} - ${currency} $${totalPaid.toFixed(2)} (Booking deposit 30%)`, { lineGap: 3 })
         .text(`Balance: ${currency} $${pdfBalance.toFixed(2)} | COP ${copBalanceFormatted}.000 (balance must pay at the office, own currency and cash only)`);
         
      currentY = doc.y + 60;
      
      // 9. Terms & Conditions
      doc.fillColor("#222222")
         .font("Helvetica-Bold")
         .fontSize(10)
         .text("SELLER'S TERMS & CONDITIONS", 40, currentY, { lineGap: 4 });
         
      const termsText = "All bookings are subject to availability and confirmation. Deposits are non-refundable once the reservation has been confirmed. Cancellations are only accepted with at least 72 hours' notice. No refunds will be issued except in cases of force majeure or external conditions that prevent the activity from taking place. The itinerary may be subject to change depending on weather conditions, river conditions, or safety recommendations. The company is not responsible for the loss of personal belongings during the tour.";
      
      doc.font("Helvetica")
         .fontSize(9)
         .fillColor("#444444")
         .text(termsText, { align: "justify", lineGap: 3 });
         
      currentY = doc.y + 15;
      
      doc.fillColor("#444444")
         .text("Respectfully,", { lineGap: 3 })
         .text("Expeditions George of the Jungle Team", { lineGap: 3 })
         .text("Office Address: Cra. 9 # 8-37, Barrio Centro, Leticia, Amazonas, Colombia.", { lineGap: 15 })
         .text("Thank you for choosing Expeditions George of the Jungle.");
         
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
