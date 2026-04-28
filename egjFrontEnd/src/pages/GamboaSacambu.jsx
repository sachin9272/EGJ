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
import { createDirectPaypalOrder } from "../assets/API/Services/PaypalService";
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

// ─── PayPal Modal ─────────────────────────────────────────────────────────
function PayPalModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayNow = async () => {
    setLoading(true);
    setError(null);
    try {
      const { approvalUrl } = await createDirectPaypalOrder({
        amount: DEPOSIT_AMOUNT,
        currency: "USD",
        description: `Gamboa & Sacambu Full Day Tour — 30% deposit (full price $${TOUR_PRICE})`,
      });
      window.location.href = approvalUrl;
    } catch (err) {
      console.error("PayPal error:", err);
      setError("Something went wrong. Please try again or contact us directly.");
      setLoading(false);
    }
  };

  return (
    <motion.div
      className={page.modal_backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={page.modal_card}
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={page.modal_header}>
          <div>
            <p className={page.modal_eyebrow}>GAMBOA &amp; SACAMBU · FULL DAY</p>
            <h2 className={page.modal_title}>Reserve Your Spot</h2>
          </div>
          <button className={page.modal_close} onClick={onClose} aria-label="Close">
            <FiX />
          </button>
        </div>

        {/* Price breakdown */}
        <div className={page.modal_breakdown}>
          <div className={page.modal_row}>
            <span className={page.modal_label}>Full tour price</span>
            <span className={page.modal_value}>${TOUR_PRICE.toFixed(2)} USD</span>
          </div>
          <div className={page.modal_row}>
            <span className={page.modal_label}>Deposit due today (30%)</span>
            <span className={page.modal_deposit}>${DEPOSIT_AMOUNT.toFixed(2)} USD</span>
          </div>
          <div className={page.modal_row + " " + page.modal_row_balance}>
            <span className={page.modal_label}>Remaining balance</span>
            <span className={page.modal_value}>
              ${(TOUR_PRICE - DEPOSIT_AMOUNT).toFixed(2)} USD
            </span>
          </div>
        </div>

        <p className={page.modal_note}>
          Secure your place with a 30% deposit via PayPal. The remaining{" "}
          <strong>${(TOUR_PRICE - DEPOSIT_AMOUNT).toFixed(2)}</strong> is
          payable on arrival in Leticia.
        </p>

        {/* Error */}
        {error && <p className={page.modal_error}>{error}</p>}

        {/* Actions */}
        <div className={page.modal_actions}>
          <button
            className={page.modal_btn_primary}
            onClick={handlePayNow}
            disabled={loading}
          >
            {loading ? (
              <span className={page.modal_spinner} />
            ) : (
              <>
                {/* PayPal logo wordmark */}
                <svg
                  height="18"
                  viewBox="0 0 101 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12.237 2.43C11.38.96 9.833 0 8.032 0H2.395C1.07 0 0 1.07 0 2.395v27.21C0 30.93 1.07 32 2.395 32h5.637c5.285 0 9.574-4.29 9.574-9.574V9.574C17.606 6.245 15.38 3.6 12.237 2.43z"
                    fill="#009CDE"
                  />
                  <path
                    d="M38.035 0H21.8C20.476 0 19.406 1.07 19.406 2.395v27.21c0 1.325 1.07 2.395 2.395 2.395h16.234c5.285 0 9.574-4.29 9.574-9.574V9.574C47.609 4.29 43.32 0 38.035 0z"
                    fill="#012169"
                  />
                  <text x="52" y="22" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="Arial">
                    Pay
                  </text>
                </svg>
                Pay ${DEPOSIT_AMOUNT.toFixed(2)} with PayPal
              </>
            )}
          </button>
          <button className={page.modal_btn_secondary} onClick={onClose}>
            Cancel
          </button>
        </div>

        <p className={page.modal_secure}>
          🔒 Payments are processed securely by PayPal
        </p>
      </motion.div>
    </motion.div>
  );
}

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

      {/* PayPal Modal */}
      <AnimatePresence>
        {showModal && <PayPalModal onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
}

export default GamboaSacambu;
