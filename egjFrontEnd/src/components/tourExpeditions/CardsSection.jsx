import Cards from "../../styles/components/tourExpeditions/cardsSection.module.scss";
import { getTours } from "../../assets/API/Services/ToursService";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

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
    matches: ["PUERTO NARINO"],
  },
  {
    order: 2,
    matches: ["GAMBOA", "SACAMBU"],
  },
  {
    order: 3,
    matches: ["2 DAYS", "1 NIGHT"],
  },
  {
    order: 4,
    matches: ["3 DAYS", "2 NIGHTS"],
  },
  {
    order: 5,
    matches: ["4 DAYS", "3 NIGHTS"],
  },
  {
    order: 6,
    matches: ["5 DAYS", "4 NIGHTS"],
  },
];

const getTourOrder = (name = "") => {
  const normalizedName = normalizeTourName(name);
  const matchedTour = orderedTourMatchers.find(({ matches }) =>
    matches.every((part) => normalizedName.includes(part))
  );

  return matchedTour ? matchedTour.order : orderedTourMatchers.length;
};

function CardsSection() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours();
        const sortedTours = [...data].sort((firstTour, secondTour) => {
          return getTourOrder(firstTour.name) - getTourOrder(secondTour.name);
        });

        setTours(sortedTours);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, []);
  return (
    <section className={Cards.cards_section_container}>
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
        {tours.map((tour, index) => (
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
              <h2 className={Cards.card_title}>{tour.name}</h2>
              <p className={Cards.card_description}>{tour.description}</p>
              <button className={Cards.card_button}>View Details</button>
            </div>
          </motion.div>
        ))}
      </article>
    </section>
  );
}

export default CardsSection;
