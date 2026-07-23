import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiCreditCard, FiMail, FiShield, FiUsers } from "react-icons/fi";
import BookingModal from "../components/BookingModal";
import Navbar from "../components/NavBar";
import { TOUR_PRICES_2026 } from "../constants/tourPricing";
import page from "../styles/pages/gamboaSacambu.module.scss";

const TEST_TOUR = TOUR_PRICES_2026.LIVE_PAYMENT_TEST;

const included = [
  "Live Stripe payment checkout",
  "Payment confirmation screen",
  "Customer confirmation email",
  "Admin booking notification email",
  "Invoice-style booking details",
];

const infoItems = [
  { icon: FiCreditCard, label: "Payment", value: "$0.50 USD" },
  { icon: FiShield, label: "Gateway", value: "Stripe Live" },
  { icon: FiMail, label: "Email", value: "Invoice test" },
  { icon: FiUsers, label: "Group size", value: "1 test booking" },
];

function LivePaymentTestTour() {
  const [showModal, setShowModal] = useState(false);

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
          <p className={page.eyebrow}>LIVE PAYMENT TEST</p>
          <h1 className={page.title}>
            <span>STRIPE</span>
            <span className={page.title_highlight}>$0.50 TEST</span>
          </h1>
          <p className={page.description}>
            A temporary test tour for verifying live Stripe payments,
            confirmation routing, and invoice emails before customers use the
            real tour pages.
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
            <button
              className={page.primary_button}
              onClick={() => setShowModal(true)}
              type="button"
            >
              Test Live Payment
            </button>
            <a
              className={page.secondary_button}
              href="https://mail.google.com/mail/?view=cm&fs=1&to=expeditionsgeorgeofthejungle@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiMail /> Email us
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
          <p className={page.section_label}>WHAT THIS TEST CHECKS</p>
          <article className={page.checklist_card}>
            <ul className={page.list}>
              {included.map((item) => (
                <li key={item}>
                  <FaCheck className={page.list_icon} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </motion.section>
      </main>

      <AnimatePresence>
        {showModal && (
          <BookingModal
            tourTitle={TEST_TOUR.title}
            pricePerPerson={TEST_TOUR.pricePerPerson}
            payInFull={TEST_TOUR.payInFull}
            fixedTotalTourists={1}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default LivePaymentTestTour;
