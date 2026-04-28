import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FaCheck, FaRegClock } from "react-icons/fa";
import {
  FiArrowDown,
  FiCompass,
  FiMail,
  FiMapPin,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { GiCampCookingPot, GiMonkey, GiRiver, GiWalkingBoot } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import BookingModal from "../components/BookingModal";
import Navbar from "../components/NavBar";
import page from "../styles/pages/gamboaSacambu.module.scss";

// ─── Tour constants ────────────────────────────────────────────────────────
const TOUR_PRICE = 500;
const DEPOSIT_RATE = 0.3;
const DEPOSIT_AMOUNT = TOUR_PRICE * DEPOSIT_RATE; // 150

const socialLinks = {
  whatsapp: "https://wa.me/573175299539",
  email:
    "https://mail.google.com/mail/?view=cm&fs=1&to=expeditionsgeorgeofthejungle@gmail.com",
};

const highlights = [
  {
    icon: GiRiver,
    title: "Scenic Amazon cruise",
    description:
      "An hour along the majestic river into a Peruvian indigenous community.",
  },
  {
    icon: GiWalkingBoot,
    title: "Two-hour jungle trek",
    description:
      "Ceiba and rubber trees, playful monkeys, sloths, butterflies and orchids.",
  },
  {
    icon: GiCampCookingPot,
    title: "Lunch with the community",
    description:
      "Taste local flavours while immersing yourself in the region's culture.",
  },
  {
    icon: GiMonkey,
    title: "Pink & grey dolphins",
    description:
      "Watch them glide beside the boat on the ride back to Leticia.",
  },
];

const itinerary = [
  {
    time: "08:00",
    title: "Depart from Leticia",
    description: "Scenic river cruise begins",
  },
  {
    time: "09:00",
    title: "Arrive Peruvian community",
    description: "Welcome & orientation",
  },
  {
    time: "09:30",
    title: "Jungle trek",
    description: "Two hours into the canopy",
  },
  {
    time: "12:30",
    title: "Lunch",
    description: "Local flavours, shared table",
  },
  {
    time: "14:30",
    title: "River return",
    description: "Dolphin sightings along the way",
  },
  {
    time: "17:00",
    title: "Back in Leticia",
    description: "Tour concludes",
  },
];

const included = [
  "Airport - agency - airport transfers",
  "All meals (breakfast, lunch, dinner)",
  "Purified water, juice, coffee, tea & milk",
  "Rubber boots, fishing rods, hammocks, mosquito nets & first aid kit",
  "Travel insurance",
  "Professional bilingual (English) guide",
];

const excluded = [
  "Entrance tax of $45,000 COP (paid at Leticia airport)",
  "Souvenirs, extra food, cigarettes",
  "Airfare (we can help arrange affordable flights)",
  "Calls, laundry, alcoholic beverages",
  "Tips for tour guides",
];

const infoItems = [
  { icon: FaRegClock, label: "Duration", value: "08:00 - 17:00" },
  { icon: FiUsers, label: "Group size", value: "Max 10 pax" },
  { icon: FiMapPin, label: "Location", value: "Leticia, Colombia" },
  { icon: FiCompass, label: "Activity level", value: "Moderate" },
];

// ─── Page ─────────────────────────────────────────────────────────────────
function GamboaSacambu() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className={page.page_shell}>
      <Navbar />

      <main className={page.page}>
        <motion.section
          className={page.hero}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className={page.eyebrow}>AMAZONAS . LETICIA . FULL DAY</p>
          <h1 className={page.title}>
            <span>FULL DAY</span>
            <span>GAMBOA &</span>
            <span className={page.title_highlight}>SACAMBU</span>
          </h1>
          <p className={page.description}>
            A full day woven through the Amazon: a scenic river cruise, a
            two-hour trek under ancient ceibas, lunch in an indigenous
            community, and dolphins on the way home.
          </p>

          <div className={page.info_row}>
            {infoItems.map(({ icon: Icon, label, value }) => (
              <div className={page.info_item} key={label}>
                <div className={page.info_label}>
                  <Icon className={page.info_icon} />
                  <span>{label}</span>
                </div>
                <p className={page.info_value}>{value}</p>
              </div>
            ))}
          </div>

          <div className={page.hero_actions}>
            <button className={page.primary_button} onClick={openModal}>
              Book Your Registration
            </button>
            <a className={page.secondary_button} href="#itinerary">
              See itinerary <FiArrowDown />
            </a>
          </div>
        </motion.section>

        <motion.section
          className={page.section}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className={page.section_label}>WHAT YOU'LL EXPERIENCE</p>
          <div className={page.highlights_grid}>
            {highlights.map(({ icon: Icon, title, description }) => (
              <article className={page.highlight_card} key={title}>
                <Icon className={page.highlight_icon} />
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="itinerary"
          className={page.section}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className={page.section_label}>THE DAY, HOUR BY HOUR</p>
          <div className={page.timeline}>
            {itinerary.map(({ time, title, description }) => (
              <article className={page.timeline_item} key={`${time}-${title}`}>
                <p className={page.timeline_time}>{time}</p>
                <div className={page.timeline_content}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
          <p className={page.note}>
            <span>A note on flexibility</span> — activities and pace vary with
            group size, your guide, and the season. Dry months (Jan-Mar,
            Jul-Sep) mean longer hikes; rainy months (Apr-Jun, Oct-Dec) invite
            more time on the water.
          </p>
        </motion.section>

        <motion.section
          className={page.section}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={page.checklists}>
            <article className={page.checklist_card}>
              <p className={page.section_label}>INCLUDED</p>
              <ul className={page.list}>
                {included.map((item) => (
                  <li key={item}>
                    <FaCheck className={page.list_icon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className={page.checklist_card}>
              <p className={page.section_label}>NOT INCLUDED</p>
              <ul className={page.list}>
                {excluded.map((item) => (
                  <li key={item}>
                    <IoCloseOutline className={page.list_icon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </motion.section>

        <motion.section
          className={page.cta_section}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className={page.section_label}>READY WHEN YOU ARE</p>
          <h2>
            Reserve your spot.
            <span>Small group, big river.</span>
          </h2>
          <p className={page.cta_copy}>
            Secure your place with a 30% deposit today. The remaining balance
            is payable on arrival in Leticia.
          </p>
          <div className={page.hero_actions}>
            <button className={page.primary_button} onClick={openModal}>
              Book Your Registration
            </button>
            <a
              className={page.secondary_button}
              href={socialLinks.email}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiMail /> Email us
            </a>
          </div>
        </motion.section>
      </main>

      <AnimatePresence>
        {showModal && (
          <BookingModal
            tourTitle="Gamboa & Sacambu Full Day"
            tourPrice={TOUR_PRICE}
            depositAmount={DEPOSIT_AMOUNT}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default GamboaSacambu;
