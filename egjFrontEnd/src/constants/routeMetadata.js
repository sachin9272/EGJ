import { TOUR_PRICES_2026 } from "./tourPricing.js";

export const BASE_URL = "https://www.expeditionsgeorgeofthejungle.com";
export const DEFAULT_IMAGE = `${BASE_URL}/Logo.webp`;

export const ORGANIZATION_ENTITY = {
  "@type": "TravelAgency",
  "@id": `${BASE_URL}/#organization`,
  name: "Expeditions George of the Jungle",
  url: `${BASE_URL}/`,
  logo: DEFAULT_IMAGE,
  image: DEFAULT_IMAGE,
  telephone: "+573208996144",
  email: "expeditionsgeorgeofthejungle@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Barrio Centro, Cra 9 #8-37",
    addressLocality: "Leticia",
    addressRegion: "Amazonas",
    addressCountry: "CO",
  },
};

export const ROUTE_METADATA_MAP = {
  "/": {
    path: "/",
    title: "Expeditions George of the Jungle | Amazon Tours Leticia Colombia",
    description:
      "Reconnect with nature on our Amazon Rainforest tours from Leticia, Colombia with expert English-speaking guides. All-inclusive expeditions, wildlife treks, and river adventures.",
    canonical: `${BASE_URL}/`,
    ogTitle: "Expeditions George of the Jungle | Amazon Tours Leticia Colombia",
    ogDescription:
      "Reconnect with nature on our Amazon Rainforest tours from Leticia, Colombia with expert English-speaking guides. All-inclusive expeditions, wildlife treks, and river adventures.",
    ogUrl: `${BASE_URL}/`,
    ogImage: DEFAULT_IMAGE,
    ogType: "website",
    ogSiteName: "Expeditions George of the Jungle",
    twitterCard: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_ENTITY,
        {
          "@type": "WebSite",
          "@id": `${BASE_URL}/#website`,
          url: `${BASE_URL}/`,
          name: "Expeditions George of the Jungle",
          publisher: {
            "@id": `${BASE_URL}/#organization`,
          },
        },
      ],
    },
  },
  "/about": {
    path: "/about",
    title: "About Us | Expeditions George of the Jungle | Leticia Amazonas",
    description:
      "Learn about George of the Jungle, founded with over 30 years of Amazon tourism experience in Leticia, Colombia. Our mission: sustainable ecotourism, conservation, and indigenous community connection.",
    canonical: `${BASE_URL}/about`,
    ogTitle: "About Us | Expeditions George of the Jungle | Leticia Amazonas",
    ogDescription:
      "Learn about George of the Jungle, founded with over 30 years of Amazon tourism experience in Leticia, Colombia. Our mission: sustainable ecotourism, conservation, and indigenous community connection.",
    ogUrl: `${BASE_URL}/about`,
    ogImage: DEFAULT_IMAGE,
    ogType: "website",
    ogSiteName: "Expeditions George of the Jungle",
    twitterCard: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Expeditions George of the Jungle",
      url: `${BASE_URL}/about`,
      description:
        "Learn about George of the Jungle, founded with over 30 years of Amazon tourism experience in Leticia, Colombia. Our mission: sustainable ecotourism, conservation, and indigenous community connection.",
      mainEntity: {
        "@id": `${BASE_URL}/#organization`,
      },
    },
  },
  "/tour": {
    path: "/tour",
    title: "Amazon Jungle Tours & Expeditions | Expeditions George of the Jungle",
    description:
      "Explore guided Amazon jungle expeditions from Leticia, Colombia. Multi-day treks, river journeys, indigenous community visits, and traditional plant medicine experiences.",
    canonical: `${BASE_URL}/tour`,
    ogTitle:
      "Amazon Jungle Tours & Expeditions | Expeditions George of the Jungle",
    ogDescription:
      "Explore guided Amazon jungle expeditions from Leticia, Colombia. Multi-day treks, river journeys, indigenous community visits, and traditional plant medicine experiences.",
    ogUrl: `${BASE_URL}/tour`,
    ogImage: DEFAULT_IMAGE,
    ogType: "website",
    ogSiteName: "Expeditions George of the Jungle",
    twitterCard: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Amazon Jungle Tours & Expeditions",
      url: `${BASE_URL}/tour`,
      description:
        "Guided Amazon rainforest tours and multi-day survival expeditions starting from Leticia, Amazonas, Colombia.",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Gamboa & Sacambu Full Day Tour",
            url: `${BASE_URL}/tour/gamboa-sacambu`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "2 Days & 1 Night Amazon Jungle Expedition",
            url: `${BASE_URL}/tour/2-days-1-night`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "3 Days & 2 Nights Amazon Jungle Expedition",
            url: `${BASE_URL}/tour/3-days-2-nights`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "4 Days & 3 Nights Amazon Jungle Expedition",
            url: `${BASE_URL}/tour/4-days-3-nights`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "5 Days & 4 Nights Ultimate Amazon Jungle Expedition",
            url: `${BASE_URL}/tour/5-days-4-nights`,
          },
          {
            "@type": "ListItem",
            position: 6,
            name: "Ayahuasca Ceremony & Spiritual Experience",
            url: `${BASE_URL}/tour/ayahuasca`,
          },
        ],
      },
    },
  },
  "/tour/gamboa-sacambu": {
    path: "/tour/gamboa-sacambu",
    title:
      "Gamboa & Sacambu Full Day Amazon Tour | Expeditions George of the Jungle",
    description:
      "Experience a full-day Amazon adventure from Leticia: dolphin watching, canopy hike, indigenous Peruvian community visit in Gamboa, and night caiman spotting.",
    canonical: `${BASE_URL}/tour/gamboa-sacambu`,
    ogTitle:
      "Gamboa & Sacambu Full Day Amazon Tour | Expeditions George of the Jungle",
    ogDescription:
      "Experience a full-day Amazon adventure from Leticia: dolphin watching, canopy hike, indigenous Peruvian community visit in Gamboa, and night caiman spotting.",
    ogUrl: `${BASE_URL}/tour/gamboa-sacambu`,
    ogImage:
      "https://res.cloudinary.com/dbuxt1ti8/image/upload/v1753902911/tours/dyymfhxrlui0mxrxxknk.jpg",
    ogType: "website",
    ogSiteName: "Expeditions George of the Jungle",
    twitterCard: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "Gamboa & Sacambu Full Day Amazon Tour",
      description:
        "Full-day Amazon adventure featuring dolphin watching, canopy hike, indigenous community visit, and caiman spotting from Leticia.",
      touristType: ["Nature lovers", "Adventure travellers", "Families"],
      offers: {
        "@type": "Offer",
        price: TOUR_PRICES_2026.GAMBOA_SACAMBU.pricePerPerson,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${BASE_URL}/tour/gamboa-sacambu`,
      },
      provider: ORGANIZATION_ENTITY,
      itinerary: {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Departure from Leticia & River Navigation",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Visit to Gamboa Peruvian Community & Jungle Trek",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Lunch & Dolphin Spotting on the Amazon River",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Caiman Spotting & Evening Return",
          },
        ],
      },
    },
  },
  "/tour/2-days-1-night": {
    path: "/tour/2-days-1-night",
    title:
      "2 Days & 1 Night Amazon Jungle Expedition | Expeditions George of the Jungle",
    description:
      "A two-day Amazon stay shaped around jungle trekking, river wildlife, bird-watching, caiman spotting, night exploration, and a peaceful return through dolphin waters from Leticia.",
    canonical: `${BASE_URL}/tour/2-days-1-night`,
    ogTitle:
      "2 Days & 1 Night Amazon Jungle Expedition | Expeditions George of the Jungle",
    ogDescription:
      "A two-day Amazon stay shaped around jungle trekking, river wildlife, bird-watching, caiman spotting, night exploration, and a peaceful return through dolphin waters from Leticia.",
    ogUrl: `${BASE_URL}/tour/2-days-1-night`,
    ogImage:
      "https://res.cloudinary.com/dbuxt1ti8/image/upload/v1761262970/tours/te2qrsn25wm8z26dc2i8.jpg",
    ogType: "website",
    ogSiteName: "Expeditions George of the Jungle",
    twitterCard: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "2 Days & 1 Night Amazon Jungle Expedition",
      description:
        "Two-day Amazon overnight excursion with jungle trekking, caiman spotting, nocturnal wildlife walks, and canoe exploration.",
      touristType: ["Adventure travellers", "Ecotourists", "Couples"],
      offers: {
        "@type": "Offer",
        price: TOUR_PRICES_2026.TWO_DAYS_ONE_NIGHT.pricePerPerson,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${BASE_URL}/tour/2-days-1-night`,
      },
      provider: ORGANIZATION_ENTITY,
    },
  },
  "/tour/3-days-2-nights": {
    path: "/tour/3-days-2-nights",
    title:
      "3 Days & 2 Nights Amazon Jungle Expedition | Expeditions George of the Jungle",
    description:
      "Three-day Amazon tour from Leticia: jungle survival skills, medicinal plant foraging, nocturnal alligator encounters, piranha fishing, and deep flooded forest canoeing.",
    canonical: `${BASE_URL}/tour/3-days-2-nights`,
    ogTitle:
      "3 Days & 2 Nights Amazon Jungle Expedition | Expeditions George of the Jungle",
    ogDescription:
      "Three-day Amazon tour from Leticia: jungle survival skills, medicinal plant foraging, nocturnal alligator encounters, piranha fishing, and deep flooded forest canoeing.",
    ogUrl: `${BASE_URL}/tour/3-days-2-nights`,
    ogImage:
      "https://res.cloudinary.com/dbuxt1ti8/image/upload/v1753905468/tours/sgjh3tjftmssorwakz9y.jpg",
    ogType: "website",
    ogSiteName: "Expeditions George of the Jungle",
    twitterCard: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "3 Days & 2 Nights Amazon Jungle Expedition",
      description:
        "Three-day immersive Amazon tour featuring survival skills, nocturnal expeditions, medicinal plant walks, and canoe navigation.",
      touristType: ["Adventure travellers", "Nature enthusiasts"],
      offers: {
        "@type": "Offer",
        price: TOUR_PRICES_2026.THREE_DAYS_TWO_NIGHTS.pricePerPerson,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${BASE_URL}/tour/3-days-2-nights`,
      },
      provider: ORGANIZATION_ENTITY,
    },
  },
  "/tour/4-days-3-nights": {
    path: "/tour/4-days-3-nights",
    title:
      "4 Days & 3 Nights Amazon Jungle Expedition | Expeditions George of the Jungle",
    description:
      "Deep 4-day Amazon jungle expedition: indigenous community stays in Gamboa and Zacambu, giant ceiba tree hikes, wildlife observation, night trekking, and dolphin watching.",
    canonical: `${BASE_URL}/tour/4-days-3-nights`,
    ogTitle:
      "4 Days & 3 Nights Amazon Jungle Expedition | Expeditions George of the Jungle",
    ogDescription:
      "Deep 4-day Amazon jungle expedition: indigenous community stays in Gamboa and Zacambu, giant ceiba tree hikes, wildlife observation, night trekking, and dolphin watching.",
    ogUrl: `${BASE_URL}/tour/4-days-3-nights`,
    ogImage:
      "https://res.cloudinary.com/dbuxt1ti8/image/upload/v1755138206/tours/mozvpzfmttofzcb0vlvj.jpg",
    ogType: "website",
    ogSiteName: "Expeditions George of the Jungle",
    twitterCard: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "4 Days & 3 Nights Amazon Jungle Expedition",
      description:
        "Four-day deep rainforest adventure including stays in indigenous communities, giant ceiba observation, and night walks.",
      touristType: ["Adventure travellers", "Wildlife photographers"],
      offers: {
        "@type": "Offer",
        price: TOUR_PRICES_2026.FOUR_DAYS_THREE_NIGHTS.pricePerPerson,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${BASE_URL}/tour/4-days-3-nights`,
      },
      provider: ORGANIZATION_ENTITY,
    },
  },
  "/tour/5-days-4-nights": {
    path: "/tour/5-days-4-nights",
    title:
      "5 Days & 4 Nights Ultimate Amazon Jungle Expedition | Expeditions George of the Jungle",
    description:
      "The definitive 5-day Amazon expedition: remote primary rainforest navigation, Lake Zacambu exploration, indigenous craft traditions, and nocturnal fauna observation.",
    canonical: `${BASE_URL}/tour/5-days-4-nights`,
    ogTitle:
      "5 Days & 4 Nights Ultimate Amazon Jungle Expedition | Expeditions George of the Jungle",
    ogDescription:
      "The definitive 5-day Amazon expedition: remote primary rainforest navigation, Lake Zacambu exploration, indigenous craft traditions, and nocturnal fauna observation.",
    ogUrl: `${BASE_URL}/tour/5-days-4-nights`,
    ogImage:
      "https://res.cloudinary.com/dbuxt1ti8/image/upload/v1755138086/tours/jig8z8jemlw2swwo3309.jpg",
    ogType: "website",
    ogSiteName: "Expeditions George of the Jungle",
    twitterCard: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "5 Days & 4 Nights Ultimate Amazon Jungle Expedition",
      description:
        "Five-day ultimate Amazon rainforest immersion with remote lake navigation, primary jungle treks, and indigenous connection.",
      touristType: ["Deep wilderness enthusiasts", "Adventure seekers"],
      offers: {
        "@type": "Offer",
        price: TOUR_PRICES_2026.FIVE_DAYS_FOUR_NIGHTS.pricePerPerson,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${BASE_URL}/tour/5-days-4-nights`,
      },
      provider: ORGANIZATION_ENTITY,
    },
  },
  "/tour/ayahuasca": {
    path: "/tour/ayahuasca",
    title:
      "Ayahuasca Experience & Healing Ceremony | Expeditions George of the Jungle",
    description:
      "Sacred Amazonian plant medicine ceremony led by an experienced indigenous shaman in Leticia, Colombia. Guided with care, safety, and cultural respect.",
    canonical: `${BASE_URL}/tour/ayahuasca`,
    ogTitle:
      "Ayahuasca Experience & Healing Ceremony | Expeditions George of the Jungle",
    ogDescription:
      "Sacred Amazonian plant medicine ceremony led by an experienced indigenous shaman in Leticia, Colombia. Guided with care, safety, and cultural respect.",
    ogUrl: `${BASE_URL}/tour/ayahuasca`,
    ogImage:
      "https://res.cloudinary.com/dbuxt1ti8/image/upload/v1755137853/tours/ixyecv1cueo69hyj353k.jpg",
    ogType: "website",
    ogSiteName: "Expeditions George of the Jungle",
    twitterCard: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "Traditional Ayahuasca Healing Ceremony",
      description:
        "Traditional indigenous Amazonian plant medicine ceremony conducted by an authentic indigenous shaman near Leticia, Colombia.",
      touristType: ["Spiritual seekers", "Cultural travellers"],
      offers: {
        "@type": "Offer",
        price: TOUR_PRICES_2026.AYAHUASCA_EXPERIENCE.pricePerPerson,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${BASE_URL}/tour/ayahuasca`,
      },
      provider: ORGANIZATION_ENTITY,
    },
  },
  "/contact": {
    path: "/contact",
    title: "Contact Us | Expeditions George of the Jungle | Leticia Colombia",
    description:
      "Get in touch with Expeditions George of the Jungle in Leticia, Amazonas, Colombia. Contact us for tour bookings, customized Amazon itineraries, and travel advice.",
    canonical: `${BASE_URL}/contact`,
    ogTitle: "Contact Us | Expeditions George of the Jungle | Leticia Colombia",
    ogDescription:
      "Get in touch with Expeditions George of the Jungle in Leticia, Amazonas, Colombia. Contact us for tour bookings, customized Amazon itineraries, and travel advice.",
    ogUrl: `${BASE_URL}/contact`,
    ogImage: DEFAULT_IMAGE,
    ogType: "website",
    ogSiteName: "Expeditions George of the Jungle",
    twitterCard: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Expeditions George of the Jungle",
      url: `${BASE_URL}/contact`,
      description:
        "Contact Expeditions George of the Jungle for inquiries and bookings.",
      mainEntity: ORGANIZATION_ENTITY,
    },
  },
  "/refund-policy": {
    path: "/refund-policy",
    title: "Refund Policy & Terms | Expeditions George of the Jungle",
    description:
      "Terms, deposit conditions, and cancellation policies for Amazon tour reservations with Expeditions George of the Jungle in Leticia, Colombia.",
    canonical: `${BASE_URL}/refund-policy`,
    ogTitle: "Refund Policy & Terms | Expeditions George of the Jungle",
    ogDescription:
      "Terms, deposit conditions, and cancellation policies for Amazon tour reservations with Expeditions George of the Jungle in Leticia, Colombia.",
    ogUrl: `${BASE_URL}/refund-policy`,
    ogImage: DEFAULT_IMAGE,
    ogType: "website",
    ogSiteName: "Expeditions George of the Jungle",
    twitterCard: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Refund Policy & Terms",
      url: `${BASE_URL}/refund-policy`,
      description:
        "Refund and cancellation terms for Expeditions George of the Jungle.",
    },
  },
  "/privacy-policy": {
    path: "/privacy-policy",
    title: "Privacy Policy | Expeditions George of the Jungle",
    description:
      "Privacy policy for Expeditions George of the Jungle. Learn how we collect, protect, and handle personal information for our Amazon tours and website visitors.",
    canonical: `${BASE_URL}/privacy-policy`,
    ogTitle: "Privacy Policy | Expeditions George of the Jungle",
    ogDescription:
      "Privacy policy for Expeditions George of the Jungle. Learn how we collect, protect, and handle personal information for our Amazon tours and website visitors.",
    ogUrl: `${BASE_URL}/privacy-policy`,
    ogImage: DEFAULT_IMAGE,
    ogType: "website",
    ogSiteName: "Expeditions George of the Jungle",
    twitterCard: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Privacy Policy",
      url: `${BASE_URL}/privacy-policy`,
      description:
        "Privacy policy for Expeditions George of the Jungle. Learn how we collect, protect, and handle personal information for our Amazon tours and website visitors.",
    },
  },
  "/success": {
    path: "/success",
    title: "Payment Successful | Expeditions George of the Jungle",
    description:
      "Your booking reservation with Expeditions George of the Jungle has been confirmed.",
    canonical: `${BASE_URL}/success`,
    robots: "noindex, nofollow",
  },
  "404": {
    path: "/404",
    title: "Page Not Found | Expeditions George of the Jungle",
    description:
      "The page you are looking for does not exist. Explore our Amazon rainforest tours and expeditions from Leticia, Colombia.",
    robots: "noindex, nofollow",
  },
};
