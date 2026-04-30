export const MINIMUM_TOURISTS = 1;
export const MAXIMUM_TOURISTS = 10;
export const BOOKING_DEPOSIT_RATE = 0.3;
export const PAYPAL_PROCESSING_MULTIPLIER = 1.08;
export const PAYPAL_PROCESSING_RATE = PAYPAL_PROCESSING_MULTIPLIER - 1;

const normalizeTourName = (name = "") =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "AND")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

export const TOUR_PRICES_2026 = [
  {
    title: "Ayahuasca Experience",
    pricePerPerson: 110,
    matches: ["AYAHUASCA"],
  },
  {
    title: "Gamboa & Sacambu Full Day",
    pricePerPerson: 130,
    matches: ["GAMBOA", "SACAMBU"],
  },
  {
    title: "2 Days & 1 Night",
    pricePerPerson: 210,
    matches: ["2 DAYS", "1 NIGHT"],
  },
  {
    title: "3 Days & 2 Nights",
    pricePerPerson: 310,
    matches: ["3 DAYS", "2 NIGHTS"],
  },
  {
    title: "4 Days & 3 Nights",
    pricePerPerson: 410,
    matches: ["4 DAYS", "3 NIGHTS"],
  },
  {
    title: "5 Days & 4 Nights",
    pricePerPerson: 510,
    matches: ["5 DAYS", "4 NIGHTS"],
  },
];

export const findTourPricing = (tourName = "") => {
  const normalizedName = normalizeTourName(tourName);

  return TOUR_PRICES_2026.find(({ matches }) =>
    matches.every((part) => normalizedName.includes(part))
  );
};

export const calculateBookingDeposit = (totalPrice) =>
  Math.round(totalPrice * BOOKING_DEPOSIT_RATE);

export const calculatePayPalProcessingFee = (deposit) =>
  Math.round(deposit * PAYPAL_PROCESSING_RATE);

export const calculatePaymentBreakdown = (pricePerPerson, totalTourists) => {
  const people = Math.min(
    Math.max(Number(totalTourists) || MINIMUM_TOURISTS, MINIMUM_TOURISTS),
    MAXIMUM_TOURISTS
  );
  const totalPrice = pricePerPerson * people;
  const deposit = calculateBookingDeposit(totalPrice);
  const paypalProcessingFee = calculatePayPalProcessingFee(deposit);

  return {
    people,
    totalPrice,
    deposit,
    paypalProcessingFee,
    balance: totalPrice - deposit + paypalProcessingFee,
  };
};
