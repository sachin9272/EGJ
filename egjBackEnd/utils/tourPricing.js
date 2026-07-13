export const MINIMUM_TOURISTS = 1;
export const MAXIMUM_TOURISTS = 10;
export const BOOKING_DEPOSIT_RATE = 0.3;
const roundCurrency = (amount) => Math.round(amount * 100) / 100;

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
  {
    title: "Live Payment Test Tour",
    pricePerPerson: 1,
    matches: ["LIVE PAYMENT TEST"],
    payInFull: true,
    fixedTotalTourists: 1,
  },
];

export const findTourPricing = (tourName = "") => {
  const normalizedName = normalizeTourName(tourName);

  return TOUR_PRICES_2026.find(({ matches }) =>
    matches.every((part) => normalizedName.includes(part))
  );
};

export const calculateBookingDeposit = (totalPrice) =>
  roundCurrency(totalPrice * BOOKING_DEPOSIT_RATE);

export const calculatePaymentBreakdown = (
  pricePerPerson,
  totalTourists,
  options = {}
) => {
  const people = Math.min(
    Math.max(Number(totalTourists) || MINIMUM_TOURISTS, MINIMUM_TOURISTS),
    MAXIMUM_TOURISTS
  );
  const totalPrice = pricePerPerson * people;

  if (options.payInFull) {
    return {
      people,
      totalPrice,
      deposit: totalPrice,
      dueToday: totalPrice,
      balance: 0,
    };
  }

  const deposit = calculateBookingDeposit(totalPrice);
  const dueToday = roundCurrency(deposit);

  return {
    people,
    totalPrice,
    deposit,
    dueToday,
    balance: roundCurrency(totalPrice - deposit),
  };
};
