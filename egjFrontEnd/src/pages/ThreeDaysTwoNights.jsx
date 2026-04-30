import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FaCheck, FaRegClock } from "react-icons/fa";
import { FiArrowDown, FiCompass, FiMail, FiMapPin, FiUsers, FiX } from "react-icons/fi";
import { GiCampCookingPot, GiCanoe, GiCrocJaws, GiNightSleep } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import BookingModal from "../components/BookingModal";
import Navbar from "../components/NavBar";
import { TOUR_PRICES_2026 } from "../constants/tourPricing";
import page from "../styles/pages/gamboaSacambu.module.scss";

const TOUR_PRICE = TOUR_PRICES_2026.THREE_DAYS_TWO_NIGHTS.pricePerPerson;

const socialLinks = {
  whatsapp: "https://wa.me/573175299539",
  email: "https://mail.google.com/mail/?view=cm&fs=1&to=expeditionsgeorgeofthejungle@gmail.com",
};

const highlights = [
  { icon: GiCanoe, title: "Arrival by Amazon River", description: "Travel about an hour by river to the Peruvian indigenous community of Gamboa and settle into hammocks with mosquito nets." },
  { icon: GiCampCookingPot, title: "Deeper jungle exploration", description: "Trek through the rainforest across multiple days while learning about medicinal plants, wildlife tracking, and survival techniques." },
  { icon: GiCrocJaws, title: "Caimans and flooded forests", description: "Spot caimans after dinner, then continue with canoe excursions through lakes and flooded forest areas rich with wildlife." },
  { icon: GiNightSleep, title: "Night walks and local connection", description: "Experience nocturnal wildlife and, depending on conditions, an optional evening walk or cultural interaction with the community." },
];

const itinerary = [
  { time: "DAY 1", title: "Journey to Gamboa and first jungle trek", description: "Cruise along the Amazon River for about an hour, settle into hammock accommodation, then begin a 2 to 3-hour trek among monkeys, birds, giant trees, butterflies, and insects." },
  { time: "DAY 1", title: "Afternoon bird-watching and night activity", description: "After lunch and rest, head out by canoe or boat to observe macaws, parrots, kingfishers, herons, toucans, and horned screamers before caiman spotting and a nocturnal jungle walk." },
  { time: "DAY 2", title: "Longer rainforest expedition", description: "Start early with breakfast, then take a deeper 3 to 4-hour jungle trek focused on medicinal plants, survival techniques, and wildlife tracking." },
  { time: "DAY 2", title: "Canoe through lakes and flooded forest", description: "Return for lunch and rest, then spend the afternoon on the water looking for birds, monkeys, and more wildlife, with optional fishing before dinner." },
  { time: "DAY 2", title: "Flexible evening experience", description: "The night may include another jungle walk or cultural interaction with the local community, depending on weather and group dynamics." },
  { time: "DAY 3", title: "Wildlife paddle and return to Leticia", description: "Wake early for breakfast, explore rivers and lakes by canoe in search of birds, monkeys, and possibly pink and gray dolphins, then return for lunch before heading back to Leticia." },
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
  { icon: FaRegClock, label: "Duration", value: "3 Days / 2 Nights" },
  { icon: FiUsers, label: "Group size", value: "Max 10 pax" },
  { icon: FiMapPin, label: "Location", value: "Leticia, Amazonas" },
  { icon: FiCompass, label: "Activity level", value: "Moderate" },
];



function ThreeDaysTwoNights() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className={page.page_shell}>
      <Navbar />
      <main className={page.page}>
        <motion.section className={page.hero} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <p className={page.eyebrow}>AMAZONAS . LETICIA . MULTI-DAY</p>
          <h1 className={page.title}>
            <span>3 DAYS &</span>
            <span className={page.title_highlight}>2 NIGHTS</span>
          </h1>
          <p className={page.description}>
            A longer Amazon journey with deeper rainforest trekking, canoe routes through lakes and flooded forests, night wildlife encounters, and a final return through river landscapes where dolphins may appear beside you.
          </p>
          <div className={page.info_row}>
            {infoItems.map(({ icon: Icon, label, value }) => (
              <div className={page.info_item} key={label}>
                <div className={page.info_label}><Icon className={page.info_icon} /><span>{label}</span></div>
                <p className={page.info_value}>{value}</p>
              </div>
            ))}
          </div>
          <div className={page.hero_actions}>
            <button className={page.primary_button} onClick={openModal}>Book Your Registration</button>
            <a className={page.secondary_button} href="#itinerary">See itinerary <FiArrowDown /></a>
          </div>
        </motion.section>

        <motion.section className={page.section} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, ease: "easeOut" }}>
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

        <motion.section id="itinerary" className={page.section} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <p className={page.section_label}>THE JOURNEY, STEP BY STEP</p>
          <div className={page.timeline}>
            {itinerary.map(({ time, title, description }) => (
              <article className={page.timeline_item} key={`${time}-${title}`}>
                <p className={page.timeline_time}>{time}</p>
                <div className={page.timeline_content}><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
          <p className={page.note}>
            <span>A note on flexibility</span> — the itinerary is designed to stay personal while minimizing environmental impact. Activities may shift with weather conditions and guide decisions. Dry season (Jan-Mar, Jul-Sep) usually favors longer jungle hikes, while rainy season (Apr-Jun, Oct-Dec) leans into more water-based exploration.
          </p>
        </motion.section>

        <motion.section className={page.section} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className={page.checklists}>
            <article className={page.checklist_card}>
              <p className={page.section_label}>INCLUDED</p>
              <ul className={page.list}>
                {included.map((item) => (<li key={item}><FaCheck className={page.list_icon} /><span>{item}</span></li>))}
              </ul>
            </article>
            <article className={page.checklist_card}>
              <p className={page.section_label}>NOT INCLUDED</p>
              <ul className={page.list}>
                {excluded.map((item) => (<li key={item}><IoCloseOutline className={page.list_icon} /><span>{item}</span></li>))}
              </ul>
            </article>
          </div>
        </motion.section>

        <motion.section className={page.cta_section} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <p className={page.section_label}>READY WHEN YOU ARE</p>
          <h2>Reserve your spot.<span>Three days in the rainforest rhythm.</span></h2>
          <p className={page.cta_copy}>A 30% booking deposit confirms your reservation. The PayPal charge is shown separately and added to the remaining balance, which is paid at the office in cash only.</p>
          <div className={page.hero_actions}>
            <button className={page.primary_button} onClick={openModal}>Book Your Registration</button>
            <a className={page.secondary_button} href={socialLinks.email} target="_blank" rel="noopener noreferrer"><FiMail /> Email us</a>
          </div>
        </motion.section>
      </main>

      <AnimatePresence>
        {showModal && (
          <BookingModal
            tourTitle="3 Days & 2 Nights"
            pricePerPerson={TOUR_PRICE}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThreeDaysTwoNights;
