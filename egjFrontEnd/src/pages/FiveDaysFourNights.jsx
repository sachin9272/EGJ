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
    title: "Five days in the rainforest",
    description:
      "Travel into Gamboa by river and settle into a slower, fuller Amazon rhythm with multiple days of land and water exploration.",
  },
  {
    icon: GiCampCookingPot,
    title: "Tracking, plants, and ecosystem insight",
    description:
      "Go beyond the first trails to learn about medicinal plants, animal tracking, ecosystem dynamics, and the relationship between species and habitat.",
  },
  {
    icon: GiCrocJaws,
    title: "Wildlife encounters across habitats",
    description:
      "Move between jungle paths, lakes, flooded forests, and remote areas for stronger chances to observe birds, monkeys, caimans, and river life.",
  },
  {
    icon: GiNightSleep,
    title: "Flexible nights in the jungle",
    description:
      "Evenings may include nocturnal treks, storytelling, or cultural interaction, depending on the weather, season, and group pace.",
  },
];

const itinerary = [
  {
    time: "DAY 1",
    title: "Arrival in Gamboa and first jungle walk",
    description:
      "Travel about an hour along the Amazon River to Gamboa, settle into hammocks with mosquito nets, and begin a 2 to 3-hour wildlife-focused jungle trek before an afternoon birdwatching canoe trip.",
  },
  {
    time: "DAY 1",
    title: "Caiman spotting and nocturnal wildlife",
    description:
      "After dinner, observe and safely handle caimans with the guide, then continue with a night walk to look for tarantulas, scorpions, snakes, frogs, and insects.",
  },
  {
    time: "DAY 2",
    title: "Deeper trek and flooded forest canoeing",
    description:
      "After breakfast, head deeper into the rainforest for a 3 to 4-hour trek focused on medicinal plants, animal tracking, and survival skills, then explore lakes and flooded forest areas by canoe with optional fishing.",
  },
  {
    time: "DAY 2",
    title: "Flexible evening activity",
    description:
      "The night can include an additional jungle walk or cultural interaction, shaped by the group and local conditions.",
  },
  {
    time: "DAY 3",
    title: "Full-day jungle exploration",
    description:
      "Combine trekking and river navigation to reach remote areas with higher wildlife density, learning more about flora, fauna, and the ecosystem before lunch in the jungle or community.",
  },
  {
    time: "DAY 3",
    title: "Observation, rest, and storytelling",
    description:
      "The afternoon is reserved for relaxation or further wildlife observation, followed by dinner and either a night walk or a storytelling session.",
  },
  {
    time: "DAY 4",
    title: "New habitats and guided flexibility",
    description:
      "Continue with jungle exploration through trekking and canoeing, observing different habitats and species, with time for photography and either free time or a guided activity based on group preference.",
  },
  {
    time: "DAY 4",
    title: "Final evening in the jungle",
    description:
      "After dinner, the night may include a final walk through the forest or a cultural experience with the community.",
  },
  {
    time: "DAY 5",
    title: "Dolphin route and return to Leticia",
    description:
      "Wake early for breakfast, paddle through rivers and lakes to watch for birds, monkeys, and possibly pink and gray dolphins, then return for lunch before departing to Leticia along the Amazon River.",
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
  "Airfare (available on request)",
  "Alcoholic beverages",
  "Tips for guides",
];

const infoItems = [
  { icon: FaRegClock, label: "Duration", value: "5 Days / 4 Nights" },
  { icon: FiUsers, label: "Group size", value: "Max 10 pax" },
  { icon: FiMapPin, label: "Location", value: "Leticia, Amazonas" },
  { icon: FiCompass, label: "Activity level", value: "Moderate" },
];

function FiveDaysFourNights() {
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
            <span>5 DAYS &</span>
            <span className={page.title_highlight}>4 NIGHTS</span>
          </h1>
          <p className={page.description}>
            The longest stay in this series, built for deeper immersion: remote
            jungle routes, layered wildlife encounters, flexible daily pacing,
            and enough time to really settle into the rainforest environment.
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
            on weather, guide, and season. The itinerary remains flexible with
            environmental sustainability in mind. Dry season (Jan-Mar, Jul-Sep)
            usually supports longer hikes, while rainy season (Apr-Jun, Oct-Dec)
            brings more water-based exploration.
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
            <span>Five days fully inside the Amazon rhythm.</span>
          </h2>
          <p className={page.cta_copy}>
            Contact the team directly to coordinate availability, transport,
            and the best season for a longer rainforest stay.
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

export default FiveDaysFourNights;
