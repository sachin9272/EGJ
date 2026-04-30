import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import {
  FiArrowDown, FiCompass, FiHeart, FiMail, FiMapPin,
  FiMoon, FiShield, FiUsers, FiX,
} from "react-icons/fi";
import { GiMeditation, GiPotionBall, GiTribalMask } from "react-icons/gi";
import BookingModal from "../components/BookingModal";
import Navbar from "../components/NavBar";
import { TOUR_PRICES_2026 } from "../constants/tourPricing";
import page from "../styles/pages/gamboaSacambu.module.scss";

const TOUR_PRICE = TOUR_PRICES_2026.AYAHUASCA_EXPERIENCE.pricePerPerson;

const socialLinks = {
  whatsapp: "https://wa.me/573175299539",
  email: "https://mail.google.com/mail/?view=cm&fs=1&to=expeditionsgeorgeofthejungle@gmail.com",
};

const highlights = [
  { icon: GiPotionBall, title: "Sacred Amazonian medicine", description: "Ayahuasca is a traditional plant brew used for spiritual, emotional, and physical healing." },
  { icon: GiTribalMask, title: "Shaman-guided ceremony", description: "The experience is led by an experienced shaman in a setting that respects ancestral traditions and cultural practices." },
  { icon: GiMeditation, title: "Deep inner process", description: "Participants may move through introspection, emotional release, personal insight, and a stronger sense of connection." },
  { icon: FiShield, title: "Safe and controlled setting", description: "The ceremony is conducted with trained professionals, clear guidance, and attention to participant safety." },
];

const overview = [
  { time: "STEP 1", title: "Arrival and introduction", description: "Participants arrive at the location and receive an introduction to the ceremony, its purpose, and the guidelines to follow." },
  { time: "STEP 2", title: "Preparation phase", description: "Preparation includes dietary recommendations and mental readiness before the ceremony begins." },
  { time: "STEP 3", title: "Night ceremony", description: "The Ayahuasca ceremony takes place at night under the supervision of the shaman." },
  { time: "STEP 4", title: "Rest and recovery", description: "After the ceremony, participants are given time to rest and recover in a controlled environment." },
  { time: "STEP 5", title: "Reflection and integration", description: "The following day is dedicated to reflection, integration, and sharing experiences." },
];

const guidelines = [
  "Follow dietary restrictions before the ceremony and avoid alcohol, drugs, and certain foods",
  "Maintain a respectful and open mindset",
  "Follow all instructions given by the shaman and guides",
  "Inform the organizers of any medical conditions",
];

const effects = [
  "Visual or auditory visions",
  "Emotional release",
  "Deep introspection",
  "Physical sensations such as nausea or purging",
];

const safety = [
  "The ceremony is conducted with trained professionals to ensure participant safety",
  "Medical conditions and medications should be disclosed in advance",
  "The experience is not recommended for individuals with certain health conditions or psychological disorders",
];

const toBring = ["Comfortable clothing", "Personal items", "Water bottle", "Insect repellent", "Flashlight"];

const infoItems = [
  { icon: FiMoon, label: "Format", value: "Night ceremony" },
  { icon: FiUsers, label: "Guidance", value: "Shaman-led" },
  { icon: FiMapPin, label: "Location", value: "Leticia, Amazonas" },
  { icon: FiCompass, label: "Focus", value: "Healing & reflection" },
];



function Ayahuasca() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className={page.page_shell}>
      <Navbar />
      <main className={page.page}>
        <motion.section className={page.hero} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <p className={page.eyebrow}>AMAZONAS . LETICIA . SPIRITUAL EXPERIENCE</p>
          <h1 className={page.title}>
            <span>AYAHUASCA</span>
            <span className={page.title_highlight}>EXPERIENCE</span>
          </h1>
          <p className={page.description}>
            A traditional Amazonian healing ceremony guided by an experienced shaman, created for spiritual, emotional, and personal reflection in a safe and respectful setting.
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
            <a className={page.secondary_button} href="#overview">See overview <FiArrowDown /></a>
          </div>
        </motion.section>

        <motion.section className={page.section} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <p className={page.section_label}>ABOUT THE EXPERIENCE</p>
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

        <motion.section className={page.section} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <p className={page.section_label}>WHAT IS AYAHUASCA?</p>
          <article className={page.highlight_card}>
            <FiHeart className={page.highlight_icon} />
            <h2>A sacred Amazonian brew</h2>
            <p>Ayahuasca is a natural plant brew from the Amazon rainforest, used for centuries by indigenous communities for healing, self-discovery, and connection with nature and the spiritual world. The experience may involve visions, emotional release, and personal insight.</p>
          </article>
        </motion.section>

        <motion.section id="overview" className={page.section} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <p className={page.section_label}>PROGRAM OVERVIEW</p>
          <div className={page.timeline}>
            {overview.map(({ time, title, description }) => (
              <article className={page.timeline_item} key={`${time}-${title}`}>
                <p className={page.timeline_time}>{time}</p>
                <div className={page.timeline_content}><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className={page.section} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className={page.checklists}>
            <article className={page.checklist_card}>
              <p className={page.section_label}>IMPORTANT GUIDELINES</p>
              <ul className={page.list}>
                {guidelines.map((item) => (<li key={item}><FaCheck className={page.list_icon} /><span>{item}</span></li>))}
              </ul>
            </article>
            <article className={page.checklist_card}>
              <p className={page.section_label}>POTENTIAL EFFECTS</p>
              <ul className={page.list}>
                {effects.map((item) => (<li key={item}><FaCheck className={page.list_icon} /><span>{item}</span></li>))}
              </ul>
              <p className={page.note}>These effects are considered part of the cleansing and healing process.</p>
            </article>
          </div>
        </motion.section>

        <motion.section className={page.section} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className={page.checklists}>
            <article className={page.checklist_card}>
              <p className={page.section_label}>SAFETY INFORMATION</p>
              <ul className={page.list}>
                {safety.map((item) => (<li key={item}><FaCheck className={page.list_icon} /><span>{item}</span></li>))}
              </ul>
            </article>
            <article className={page.checklist_card}>
              <p className={page.section_label}>WHAT TO BRING</p>
              <ul className={page.list}>
                {toBring.map((item) => (<li key={item}><FaCheck className={page.list_icon} /><span>{item}</span></li>))}
              </ul>
            </article>
          </div>
        </motion.section>

        <motion.section className={page.cta_section} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <p className={page.section_label}>CONTACT DETAILS</p>
          <h2>Expeditions George of the Jungle<span>Leticia, Amazonas, Colombia.</span></h2>
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
            tourTitle="Ayahuasca Experience"
            pricePerPerson={TOUR_PRICE}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Ayahuasca;
