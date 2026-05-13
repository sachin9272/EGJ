import Cards from "../../styles/components/tourExpeditions/cardsSection.module.scss";
import { getTours } from "../../assets/API/Services/ToursService";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const normalizeTourName = (name = "") =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\|/g, "")
    .replace(/&/g, "AND")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

const orderedTourMatchers = [
  {
    order: 0,
    matches: ["AYAHUASCA"],
  },
  {
    order: 1,
    matches: ["GAMBOA", "SACAMBU"],
  },
  {
    order: 2,
    matches: ["2 DAYS", "1 NIGHT"],
  },
  {
    order: 3,
    matches: ["3 DAYS", "2 NIGHTS"],
  },
  {
    order: 4,
    matches: ["4 DAYS", "3 NIGHTS"],
  },
  {
    order: 5,
    matches: ["5 DAYS", "4 NIGHTS"],
  },
];

const isPuertoNarinoTour = (name = "") =>
  normalizeTourName(name).includes("PUERTO NARINO");

const getTourOrder = (name = "") => {
  const normalizedName = normalizeTourName(name);
  const matchedTour = orderedTourMatchers.find(({ matches }) =>
    matches.every((part) => normalizedName.includes(part))
  );

  return matchedTour ? matchedTour.order : orderedTourMatchers.length;
};

const getTourDetailsPath = (name = "") => {
  const normalizedName = normalizeTourName(name);

  if (normalizedName.includes("AYAHUASCA")) {
    return "/tour/ayahuasca";
  }

  if (normalizedName.includes("GAMBOA") && normalizedName.includes("SACAMBU")) {
    return "/tour/gamboa-sacambu";
  }

  if (normalizedName.includes("2 DAYS") && normalizedName.includes("1 NIGHT")) {
    return "/tour/2-days-1-night";
  }

  if (normalizedName.includes("3 DAYS") && normalizedName.includes("2 NIGHTS")) {
    return "/tour/3-days-2-nights";
  }

  if (normalizedName.includes("4 DAYS") && normalizedName.includes("3 NIGHTS")) {
    return "/tour/4-days-3-nights";
  }

  if (normalizedName.includes("5 DAYS") && normalizedName.includes("4 NIGHTS")) {
    return "/tour/5-days-4-nights";
  }

  return null;
};

const getTourDisplayName = (name = "") =>
  normalizeTourName(name).includes("AYAHUASCA") ? "AYAHUASCA EXPERIENCE" : name;

const renderTourTitle = (displayName = "") => {
  if (displayName !== "AYAHUASCA EXPERIENCE") return displayName;

  return (
    <>
      <span>AYAHUASCA</span>
      <span>EXPERIENCE</span>
    </>
  );
};

function CardsSection() {
  const [tours, setTours] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours();
        const sortedTours = [...data]
          .filter((tour) => !isPuertoNarinoTour(tour.name))
          .sort((firstTour, secondTour) => {
            return getTourOrder(firstTour.name) - getTourOrder(secondTour.name);
          });

        setTours(sortedTours);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, []);

  useEffect(() => {
    if (location.state?.scrollToSection !== "pick-your-tour") return;

    const scrollToSection = () => {
      document
        .getElementById("pick-your-tour")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });

      navigate(location.pathname, { replace: true, state: null });
    };

    const timeoutId = window.setTimeout(scrollToSection, 0);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.state, navigate]);
  return (
    <section
      id="pick-your-tour"
      className={Cards.cards_section_container}
    >
      <motion.header
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-15%" }}
        transition={{
          delay: 0,
          y: { duration: 0.5, ease: "easeInOut" },
          opacity: { duration: 1.2, ease: "easeOut" },
        }}
        className={Cards.cards_section_text_container}
      >
        <h1 className={Cards.cards_section_title}>TIME TO PICK YOUR TOUR</h1>
        <p className={Cards.cards_section_description}>
          From Brazil’s samba beats to Peru’s rich flavors and vibrant
          indigenous traditions, each expedition offers something unforgettable.
          Choose 2–5 day tours with expert guides and all-inclusive service —
          your adventure awaits.
        </p>
      </motion.header>

      <article className={Cards.cards_container}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-3%" }}
          transition={{
            delay: 0,
            y: { duration: 0.5, ease: "easeInOut" },
            opacity: { duration: 1.2, ease: "easeOut" },
          }}
          className={Cards.card_individual_container}
        >
          <figure className={Cards.card_image_container}>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80"
              alt="Live PayPal payment test"
              className={Cards.card_image}
            />
          </figure>
          <div className={Cards.card_text_container}>
            <h2 className={Cards.card_title}>LIVE PAYMENT TEST</h2>
            <p className={Cards.card_description}>
              Temporary $1 PayPal live checkout to verify successful payment,
              confirmation routing, and invoice emails.
            </p>
            <button
              className={Cards.card_button}
              type="button"
              onClick={() => navigate("/tour/live-payment-test")}
            >
              View Details
            </button>
          </div>
        </motion.div>

        {tours.map((tour, index) => {
          const detailsPath = getTourDetailsPath(tour.name);
          const displayName = getTourDisplayName(tour.name);
          const isAyahuascaExperience =
            displayName === "AYAHUASCA EXPERIENCE";

          return (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-3%" }}
            transition={{
              delay: 0,
              y: { duration: 0.5, ease: "easeInOut" },
              opacity: { duration: 1.2, ease: "easeOut" },
            }}
            className={Cards.card_individual_container}
            key={tour._id || `${tour.name}-${index}`}
          >
            <figure className={Cards.card_image_container}>
              <img
                src={
                  tour.images?.[0]?.url ||
                  "https://res.cloudinary.com/default-placeholder.jpg"
                }
                alt={tour.name || "Tour Image"}
                className={Cards.card_image}
              />
            </figure>
            <div className={Cards.card_text_container}>
              <h2
                className={`${Cards.card_title} ${
                  isAyahuascaExperience ? Cards.card_title_stacked : ""
                }`}
              >
                {renderTourTitle(displayName)}
              </h2>
              <p className={Cards.card_description}>{tour.description}</p>
              <button
                className={Cards.card_button}
                type="button"
                onClick={() => detailsPath && navigate(detailsPath)}
              >
                View Details
              </button>
            </div>
          </motion.div>
          );
        })}
      </article>
    </section>
  );
}

export default CardsSection;
