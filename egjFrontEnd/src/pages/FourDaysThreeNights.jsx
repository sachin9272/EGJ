import { motion } from "motion/react";
import { FaCheck, FaRegClock } from "react-icons/fa";
import {
  FiArrowDown,
  FiCompass,
  FiMail,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import {
  GiCampCookingPot,
  GiCanoe,
  GiCrocJaws,
  GiNightSleep,
} from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import Navbar from "../components/NavBar";
import page from "../styles/pages/gamboaSacambu.module.scss";

const socialLinks = {
  whatsapp: "https://wa.me/573175299539",
  email:
    "https://mail.google.com/mail/?view=cm&fs=1&to=expeditionsgeorgeofthejungle@gmail.com",
};

const highlights = [
  {
    icon: GiCanoe,
    title: "Four days in the Amazon",
    description:
      "Arrive in Gamboa by river, sleep in hammocks with mosquito nets, and explore farther reaches of the rainforest over multiple days.",
  },
  {
    icon: GiCampCookingPot,
    title: "Deeper jungle knowledge",
    description:
      "Learn about medicinal plants, wildlife tracking, survival techniques, and the wider rainforest ecosystem through longer treks.",
  },
  {
    icon: GiCrocJaws,
    title: "Caimans, lakes, and flooded forest",
    description:
      "Balance land and water exploration with birdwatching, canoeing, optional fishing, and supervised caiman encounters.",
  },
  {
    icon: GiNightSleep,
    title: "Night walks and cultural moments",
    description:
      "Evening activities can include nocturnal wildlife walks, storytelling, or cultural interaction with the indigenous community.",
  },
];

const itinerary = [
  {
    time: "DAY 1",
    title: "Arrival in Gamboa and first jungle encounter",
    description:
      "Travel about an hour along the Amazon River to Gamboa, settle into hammock accommodation, and begin a 2 to 3-hour trek among monkeys, birds, giant trees, spiders, and butterflies.",
  },
  {
    time: "DAY 1",
    title: "Birdwatching, caimans, and night walk",
    description:
      "After lunch and rest, continue by canoe or boat to observe macaws, parrots, kingfishers, herons, toucans, and horned screamers, then experience caiman spotting and a nocturnal trek after dinner.",
  },
  {
    time: "DAY 2",
    title: "Deeper rainforest trek",
    description:
      "Start with breakfast and continue on a 3 to 4-hour trek deeper into the jungle, focusing on medicinal plants, wildlife tracking, and survival techniques before lunch and rest.",
  },
  {
    time: "DAY 2",
    title: "Flooded forest canoeing and evening options",
    description:
      "Spend the afternoon exploring lakes and flooded forest areas by canoe, with chances to spot birds and monkeys, optional fishing, dinner, and either a night walk or cultural exchange.",
  },
  {
    time: "DAY 3",
    title: "Longer exploration day",
    description:
      "An extended day of trekking and river navigation takes you into more remote parts of the jungle, with stronger chances of wildlife sightings and more learning about plant uses and animal behavior.",
  },
  {
    time: "DAY 3",
    title: "Flexible afternoon and night activity",
    description:
      "After lunch in the jungle or community, the afternoon may include canoeing, wildlife observation, or rest, followed by dinner and either a night walk or storytelling and cultural interaction.",
  },
  {
    time: "DAY 4",
    title: "Final paddle and return to Leticia",
    description:
      "Wake early for breakfast, take a canoe ride through rivers and lakes in search of birds, monkeys, and possibly pink and gray dolphins, then return for lunch before heading back to Leticia by river.",
  },
];

const included = [
  "Airport - agency - airport transportation",
  "All meals during the excursion (breakfast, lunch, dinner)",
  "Purified water, juice, coffee, tea, and milk",
  "Rubber boots, fishing gear, hammocks, and mosquito nets",
  "First aid kit on request",
  "Travel insurance",
  "Professional bilingual guide",
];

const excluded = [
  "Entrance tax of COP $45,000 paid at Leticia airport before departure",
  "Souvenirs, snacks, cigarettes, and other personal expenses",
  "Airfare (can be arranged upon request)",
  "Alcoholic beverages",
  "Tips for guides",
];

const infoItems = [
  { icon: FaRegClock, label: "Duration", value: "4 Days / 3 Nights" },
  { icon: FiUsers, label: "Group size", value: "Max 10 pax" },
  { icon: FiMapPin, label: "Location", value: "Leticia, Amazonas" },
  { icon: FiCompass, label: "Activity level", value: "Moderate" },
];

function FourDaysThreeNights() {
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
          <p className={page.eyebrow}>AMAZONAS . LETICIA . MULTI-DAY</p>
          <h1 className={page.title}>
            <span>4 DAYS &</span>
            <span className={page.title_highlight}>3 NIGHTS</span>
          </h1>
          <p className={page.description}>
            A fuller Amazon immersion with longer jungle exploration, river
            navigation into remote areas, wildlife-focused canoe routes, and
            flexible evenings shaped by the forest, the season, and the
            community around you.
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
            <a
              className={page.primary_button}
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Your Registration
            </a>
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
          <p className={page.section_label}>THE JOURNEY, STEP BY STEP</p>
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
            <span>A note on flexibility</span> — activities may vary depending
            on weather, season, and guide decisions. The itinerary stays
            flexible to minimize environmental impact. Dry season (Jan-Mar,
            Jul-Sep) usually allows longer hikes, while rainy season (Apr-Jun,
            Oct-Dec) favors more water-based activities.
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
            <span>Four days woven into the rainforest.</span>
          </h2>
          <p className={page.cta_copy}>
            Contact Expeditions George of the Jungle to check availability,
            align the trip with the season, and get everything ready for your
            multi-day Amazon experience.
          </p>
          <div className={page.hero_actions}>
            <a
              className={page.primary_button}
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Your Registration
            </a>
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
    </div>
  );
}

export default FourDaysThreeNights;
