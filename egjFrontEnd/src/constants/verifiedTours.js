import { TOUR_PRICES_2026 } from "./tourPricing";

/**
 * Verified initial tour catalog for Expeditions George of the Jungle.
 * Used for static pre-rendering (SSG) of /tour and fallback when offline.
 * Reuses verified prices from TOUR_PRICES_2026 as the single source of truth.
 */
export const VERIFIED_TOUR_CATALOG = [
  {
    _id: "tour-2-days-1-night",
    name: "2 DAYS & 1 NIGHT",
    description:
      "Journey to Gamboa indigenous community. The day includes a wildlife trek and an afternoon boat ride for bird-spotting.",
    price: TOUR_PRICES_2026.TWO_DAYS_ONE_NIGHT.pricePerPerson,
    detailPath: "/tour/2-days-1-night",
    images: [
      {
        url: "https://res.cloudinary.com/dbuxt1ti8/image/upload/v1761262970/tours/te2qrsn25wm8z26dc2i8.jpg",
      },
    ],
  },
  {
    _id: "tour-3-days-2-nights",
    name: "3 DAYS & 2 NIGHTS",
    description:
      "Amazon adventure! Cruise to an indigenous village, then trek the jungle to observe diverse flora, monkeys, sloths, and insects.",
    price: TOUR_PRICES_2026.THREE_DAYS_TWO_NIGHTS.pricePerPerson,
    detailPath: "/tour/3-days-2-nights",
    images: [
      {
        url: "https://res.cloudinary.com/dbuxt1ti8/image/upload/v1753905468/tours/sgjh3tjftmssorwakz9y.jpg",
      },
    ],
  },
  {
    _id: "tour-4-days-3-nights",
    name: "4 DAYS & 3 NIGHTS",
    description:
      "First stop: Gamboa, indigenous Peruvian community. Rest is available in bedrooms, followed by bird-spotting after lunch.",
    price: TOUR_PRICES_2026.FOUR_DAYS_THREE_NIGHTS.pricePerPerson,
    detailPath: "/tour/4-days-3-nights",
    images: [
      {
        url: "https://res.cloudinary.com/dbuxt1ti8/image/upload/v1755138206/tours/mozvpzfmttofzcb0vlvj.jpg",
      },
    ],
  },
  {
    _id: "tour-5-days-4-nights",
    name: "5 DAYS & 4 NIGHTS",
    description:
      "Breakfast in Zacambu is followed by a primary jungle trek to spot huge trees (ceibas, rubber) and wildlife (monkeys, snakes, morpho).",
    price: TOUR_PRICES_2026.FIVE_DAYS_FOUR_NIGHTS.pricePerPerson,
    detailPath: "/tour/5-days-4-nights",
    images: [
      {
        url: "https://res.cloudinary.com/dbuxt1ti8/image/upload/v1755138086/tours/jig8z8jemlw2swwo3309.jpg",
      },
    ],
  },
  {
    _id: "tour-ayahuasca",
    name: "AYAHUASCA",
    description:
      "Ayahuasca is an ancient Amazonian indigenous medicinal beverage that takes you into a 3–4 hour unique spiritual state.",
    price: TOUR_PRICES_2026.AYAHUASCA_EXPERIENCE.pricePerPerson,
    detailPath: "/tour/ayahuasca",
    images: [
      {
        url: "https://res.cloudinary.com/dbuxt1ti8/image/upload/v1755137853/tours/ixyecv1cueo69hyj353k.jpg",
      },
    ],
  },
  {
    _id: "tour-gamboa-sacambu",
    name: "GAMBOA & SACAMBU",
    description:
      "Full-day Amazon adventure! Cruise to a village, trek the jungle, and observe diverse flora, monkeys, sloths, and insects.",
    price: TOUR_PRICES_2026.GAMBOA_SACAMBU.pricePerPerson,
    detailPath: "/tour/gamboa-sacambu",
    images: [
      {
        url: "https://res.cloudinary.com/dbuxt1ti8/image/upload/v1753902911/tours/dyymfhxrlui0mxrxxknk.jpg",
      },
    ],
  },
];
