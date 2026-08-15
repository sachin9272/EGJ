import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { createCustomPaymentOrder } from "../assets/API/Services/StripeService";
import { MAXIMUM_TOURISTS, MINIMUM_TOURISTS } from "../constants/tourPricing";
import page from "../styles/components/bookingModal.module.scss";

export default function PayNowModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const scrollY = window.scrollY;
    const originalBodyStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = originalBodyStyle.position;
      document.body.style.top = originalBodyStyle.top;
      document.body.style.left = originalBodyStyle.left;
      document.body.style.right = originalBodyStyle.right;
      document.body.style.width = originalBodyStyle.width;
      document.body.style.overflow = originalBodyStyle.overflow;
      window.scrollTo(0, scrollY);
    };
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationality: "",
    email: "",
    phone: "",
    totalTourists: String(MINIMUM_TOURISTS),
    participants: [],
    dates: "",
    arrivalFlight: "",
    departureFlight: "",
    hotel: "",
    amount: "",
    notes: "",
  });

  // Sync participants array with selected number of tourists minus the primary booker
  useEffect(() => {
    const count = Number(formData.totalTourists) || MINIMUM_TOURISTS;
    const additionalParticipantsCount = Math.max(0, count - 1);
    setFormData((prev) => ({
      ...prev,
      participants: Array.from({ length: additionalParticipantsCount }, (_, i) =>
        prev.participants[i] || { firstName: "", lastName: "", passport: "" }
      ),
    }));
  }, [formData.totalTourists]);

  const handleParticipantChange = (e) => {
    const { name, value } = e.target;
    const match = name.match(/participants\[(\d+)\]\.(.+)/);
    if (!match) return;
    const idx = Number(match[1]);
    const field = match[2];
    setFormData((prev) => {
      const newParticipants = [...prev.participants];
      newParticipants[idx] = { ...newParticipants[idx], [field]: value };
      return { ...prev, participants: newParticipants };
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const amountValue = Number(formData.amount);

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill out the required fields (Name and Email).");
      return;
    }
    if (!Number.isFinite(amountValue) || amountValue < 1) {
      setError("Please enter a valid amount of at least $1.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handlePayNow = async () => {
    setLoading(true);
    setError(null);
    try {
      const { url } = await createCustomPaymentOrder({ formData });
      window.location.href = url;
    } catch (err) {
      console.error("Stripe error:", err);
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
        <div className={page.modal_header}>
          <div>
            <p className={page.modal_eyebrow}>Custom Tour Payment</p>
            <h2 className={page.modal_title}>Pay Now</h2>
          </div>
          <button className={page.modal_close} onClick={onClose} aria-label="Close">
            <FiX />
          </button>
        </div>

        {error && <p className={page.modal_error}>{error}</p>}

        {step === 1 ? (
          <form className={page.form} onSubmit={handleNext}>
            <div className={page.form_row}>
              <div className={page.form_group}>
                <label>First and last Name *</label>
                <div className={page.name_group}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={page.form_group}>
                <label>Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={page.form_group}>
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={page.form_group}>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className={page.form_group}>
              <label>How many people will be going with you? (1 to 10)</label>
              <select
                name="totalTourists"
                min={MINIMUM_TOURISTS}
                max={MAXIMUM_TOURISTS}
                value={formData.totalTourists}
                onChange={handleChange}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            {/* Participant details */}
            {formData.participants.map((p, idx) => (
              <div key={idx} className={page.form_group}>
                <label>Participant {idx + 2} (optional)</label>
                <input
                  type="text"
                  name={`participants[${idx}].firstName`}
                  placeholder="First Name"
                  value={p.firstName}
                  onChange={handleParticipantChange}
                />
                <input
                  type="text"
                  name={`participants[${idx}].lastName`}
                  placeholder="Last Name"
                  value={p.lastName}
                  onChange={handleParticipantChange}
                />
                <input
                  type="text"
                  name={`participants[${idx}].passport`}
                  placeholder="Passport # (optional)"
                  value={p.passport}
                  onChange={handleParticipantChange}
                />
              </div>
            ))}

            <div className={page.form_group}>
              <label>Dates for your tour package</label>
              <input
                type="date"
                name="dates"
                value={formData.dates}
                onChange={handleChange}
              />
            </div>

            <div className={page.form_group}>
              <label>Arrival Date/Time & Flight Number (optional)</label>
              <input
                type="text"
                name="arrivalFlight"
                placeholder="e.g. Oct 12, 10:30 AM - LA2233"
                value={formData.arrivalFlight}
                onChange={handleChange}
              />
            </div>

            <div className={page.form_group}>
              <label>Departure Date/Time & Flight Number (optional)</label>
              <input
                type="text"
                name="departureFlight"
                placeholder="e.g. Oct 18, 5:00 PM - LA2234"
                value={formData.departureFlight}
                onChange={handleChange}
              />
            </div>

            <div className={page.form_group}>
              <label>Hotel Accommodation Address (optional)</label>
              <input
                type="text"
                name="hotel"
                placeholder="e.g. Wawazu Amazon Hotel"
                value={formData.hotel}
                onChange={handleChange}
              />
            </div>

            <div className={page.form_group}>
              <label>Amount to Pay (USD) *</label>
              <input
                type="number"
                name="amount"
                min="1"
                step="0.01"
                placeholder="e.g. 250"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className={page.form_group}>
              <label>What is this payment for?</label>
              <input
                type="text"
                name="notes"
                placeholder="e.g. Custom 6-day Amazon tour"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={page.form_submit}>
              Continue
            </button>
          </form>
        ) : (
          <div className={page.payment_step}>
            <div className={page.modal_breakdown}>
              <div className={page.modal_row}>
                <span className={page.modal_label}>Name</span>
                <span className={page.modal_value}>
                  {formData.firstName} {formData.lastName}
                </span>
              </div>
              {formData.notes && (
                <div className={page.modal_row}>
                  <span className={page.modal_label}>Details</span>
                  <span className={page.modal_value}>{formData.notes}</span>
                </div>
              )}
              <div className={page.modal_row + " " + page.modal_row_balance}>
                <span className={page.modal_label}>Amount to pay</span>
                <span className={page.modal_deposit}>
                  ${amountValue.toFixed(2)} USD
                </span>
              </div>
            </div>

            <p className={page.modal_note}>
              You are about to pay{" "}
              <strong>${amountValue.toFixed(2)} USD</strong> to Expeditions
              George of the Jungle for your customized tour.
            </p>

            <div className={page.modal_actions}>
              <button
                className={page.modal_btn_primary}
                onClick={handlePayNow}
                disabled={loading}
              >
                {loading ? (
                  <span className={page.modal_spinner} />
                ) : (
                  <>Pay ${amountValue.toFixed(2)} Now</>
                )}
              </button>
              <button
                className={page.modal_btn_secondary}
                onClick={() => setStep(1)}
              >
                Back to Form
              </button>
            </div>
            <p className={page.modal_secure}>
              Payments are processed securely by Stripe.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
