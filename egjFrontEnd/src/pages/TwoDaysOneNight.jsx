import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FaCheck, FaRegClock } from "react-icons/fa";
import { FiArrowDown, FiCompass, FiMail, FiMapPin, FiUsers, FiX } from "react-icons/fi";
import { GiCampCookingPot, GiCanoe, GiCrocJaws, GiNightSleep } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import BookingModal from "../components/BookingModal";
import Navbar from "../components/NavBar";
import page from "../styles/pages/gamboaSacambu.module.scss";

const TOUR_PRICE = 450;
const DEPOSIT_RATE = 0.3;
const DEPOSIT_AMOUNT = TOUR_PRICE * DEPOSIT_RATE;

const socialLinks = {
  whatsapp: "https://wa.me/573175299539",
  email: "https://mail.google.com/mail/?view=cm&fs=1&to=expeditionsgeorgeofthejungle@gmail.com",
};

const highlights = [
  { icon: GiCanoe, title: "Amazon River arrival", description: "A scenic one-hour boat ride leads into the Peruvian indigenous community of Gamboa." },
  { icon: GiCampCookingPot, title: "Jungle trek & community meals", description: "Explore the forest for 2 to 3 hours, then recharge with local meals and time to rest." },
  { icon: GiCrocJaws, title: "Caiman encounter", description: "After dinner, your guide demonstrates safe catch-and-release alligator spotting up close." },
  { icon: GiNightSleep, title: "Night wildlife adventure", description: "Sleep in hammocks with mosquito nets after spotting nocturnal creatures on an evening trek." },
];

const itinerary = [
  { time: "DAY 1", title: "River journey to Gamboa", description: "Travel for about an hour along the Amazon River, then settle into hammocks with mosquito nets." },
  { time: "DAY 1", title: "Jungle immersion", description: "A 2 to 3-hour trek reveals monkeys, insects, giant trees, butterflies, birds, and spiders." },
  { time: "DAY 1", title: "Afternoon bird-watching", description: "After lunch and rest, head out by boat or canoe to watch macaws, parrots, toucans, herons, and more." },
  { time: "DAY 1", title: "Caimans and nocturnal trekking", description: "Following dinner, experience caiman spotting, then a one-hour night trek for tarantulas, frogs, snakes, and other nocturnal wildlife." },
  { time: "DAY 2", title: "Breakfast and canoe exploration", description: "Start with a local breakfast, then paddle through lakes and narrow channels for bird and monkey sightings." },
  { time: "DAY 2", title: "Optional fishing and return to Leticia", description: "Fish for 1 to 2 hours if you like, enjoy lunch in the community, and return by river with chances to spot pink and gray dolphins." },
];

const included = [
  "Airport - agency - airport transportation",
  "All meals during the excursion (breakfast, lunch, dinner)",
  "Purified water, juice, coffee, tea, and milk",
  "Rubber boots, fishing rods, hammocks, mosquito nets, and first aid kit on request",
  "Travel insurance",
  "Professional bilingual English-speaking guide",
];

const excluded = [
  "Entrance tax of COP $45,000 paid before departure at Leticia airport",
  "Souvenirs, extra food, cigarettes, and other personal items",
  "Airfare (the agency can assist with booking)",
  "Calls, laundry, alcohol, and other personal expenses",
  "Tips for guides",
];

const infoItems = [
  { icon: FaRegClock, label: "Duration", value: "2 Days / 1 Night" },
  { icon: FiUsers, label: "Group size", value: "Max 10 pax" },
  { icon: FiMapPin, label: "Location", value: "Gamboa, Amazonas" },
  { icon: FiCompass, label: "Activity level", value: "Moderate" },
];



function TwoDaysOneNight() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className={page.page_shell}>
      <Navbar />
      <main className={page.page}>
        <motion.section className={page.hero} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <p className={page.eyebrow}>AMAZONAS . LETICIA . OVERNIGHT</p>
          <h1 className={page.title}>
            <span>2 DAYS &</span>
            <span className={page.title_highlight}>1 NIGHT</span>
          </h1>
          <p className={page.description}>
            A two-day Amazon stay shaped around jungle trekking, river wildlife, bird-watching, caiman spotting, night exploration, and a peaceful return through dolphin waters.
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
            <span>A note on flexibility</span> — tours are personalized to the group while minimizing environmental impact. Dry season (Jan-Mar, Jul-Sep) usually allows longer hikes, while rainy season (Apr-Jun, Oct-Dec) brings more boat-based exploration. Weather in Leticia is unpredictable, and activities can shift with the season, guide, and group size.
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
          <h2>Reserve your spot.<span>Two days deep in the Amazon.</span></h2>
          <p className={page.cta_copy}>Secure your place with a 30% deposit today. The remaining balance is payable on arrival in Leticia.</p>
          <div className={page.hero_actions}>
            <button className={page.primary_button} onClick={openModal}>Book Your Registration</button>
            <a className={page.secondary_button} href={socialLinks.email} target="_blank" rel="noopener noreferrer"><FiMail /> Email us</a>
          </div>
        </motion.section>
      </main>

      <AnimatePresence>
        {showModal && (
          <BookingModal
            tourTitle="2 Days & 1 Night"
            tourPrice={TOUR_PRICE}
            depositAmount={DEPOSIT_AMOUNT}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default TwoDaysOneNight;
