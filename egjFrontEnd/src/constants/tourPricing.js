export const MINIMUM_TOURISTS = 1;
export const MAXIMUM_TOURISTS = 10;
export const BOOKING_DEPOSIT_RATE = 0.3;
export const PAYPAL_PROCESSING_MULTIPLIER = 1.08;
export const PAYPAL_PROCESSING_RATE = PAYPAL_PROCESSING_MULTIPLIER - 1;

const roundCurrency = (amount) => Math.round(amount * 100) / 100;

export const TOUR_PRICES_2026 = {
  AYAHUASCA_EXPERIENCE: {
    title: "Ayahuasca Experience",
    pricePerPerson: 110,
  },
  GAMBOA_SACAMBU: {
    title: "Gamboa & Sacambu Full Day",
    pricePerPerson: 130,
  },
  TWO_DAYS_ONE_NIGHT: {
    title: "2 Days & 1 Night",
    pricePerPerson: 210,
  },
  THREE_DAYS_TWO_NIGHTS: {
    title: "3 Days & 2 Nights",
    pricePerPerson: 310,
  },
  FOUR_DAYS_THREE_NIGHTS: {
    title: "4 Days & 3 Nights",
    pricePerPerson: 410,
  },
  FIVE_DAYS_FOUR_NIGHTS: {
    title: "5 Days & 4 Nights",
    pricePerPerson: 510,
  },
};

export const calculateBookingDeposit = (totalPrice) =>
  roundCurrency(totalPrice * BOOKING_DEPOSIT_RATE);

export const calculatePayPalProcessingFee = (deposit) =>
  roundCurrency(deposit * PAYPAL_PROCESSING_RATE);

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
      paypalProcessingFee: 0,
      dueToday: totalPrice,
      balance: 0,
    };
  }

  const deposit = calculateBookingDeposit(totalPrice);
  const paypalProcessingFee = calculatePayPalProcessingFee(deposit);
  const dueToday = roundCurrency(deposit + paypalProcessingFee);

  return {
    people,
    totalPrice,
    deposit,
    paypalProcessingFee,
    dueToday,
    balance: roundCurrency(totalPrice - deposit),
  };
};
