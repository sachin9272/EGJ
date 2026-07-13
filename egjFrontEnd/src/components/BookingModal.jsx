import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { createDirectStripeOrder } from "../assets/API/Services/StripeService";
import {
  MAXIMUM_TOURISTS,
  MINIMUM_TOURISTS,
  BOOKING_DEPOSIT_RATE,
  calculateBookingDeposit,
  calculatePaymentBreakdown,
} from "../constants/tourPricing";
import page from "../styles/components/bookingModal.module.scss";

export default function BookingModal({
  tourTitle,
  pricePerPerson,
  payInFull = false,
  fixedTotalTourists = null,
  onClose,
}) {
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
    tourPackage: tourTitle,
    totalTourists: String(fixedTotalTourists || MINIMUM_TOURISTS),
    dates: "",
    message: "",
  });

  const paymentBreakdown = calculatePaymentBreakdown(
    pricePerPerson,
    formData.totalTourists,
    { payInFull }
  );
  const depositPerPerson = payInFull
    ? pricePerPerson
    : calculateBookingDeposit(pricePerPerson);
  const remainingBalancePerPerson = payInFull
    ? 0
    : pricePerPerson - depositPerPerson;
  const depositPercent = payInFull ? 100 : Math.round(BOOKING_DEPOSIT_RATE * 100);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill out the required fields (Name and Email).");
      return;
    }
    const totalTourists = Number(fixedTotalTourists || formData.totalTourists);
    if (
      !Number.isFinite(totalTourists) ||
      totalTourists < MINIMUM_TOURISTS ||
      totalTourists > MAXIMUM_TOURISTS
    ) {
      setError("Tour bookings require 1 to 10 people.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handlePayNow = async () => {
    setLoading(true);
    setError(null);
    try {
      const { url } = await createDirectStripeOrder({
        formData: formData,
      });
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
            <p className={page.modal_eyebrow}>{tourTitle}</p>
            <h2 className={page.modal_title}>Reserve Your Spot</h2>
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
              <label>What tour package are you interested in?</label>
              <input
                type="text"
                name="tourPackage"
                value={formData.tourPackage}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div className={page.form_group}>
              <label>How many people will be going with you? (1 to 10)</label>
              <input
                type="number"
                name="totalTourists"
                min={MINIMUM_TOURISTS}
                max={MAXIMUM_TOURISTS}
                value={formData.totalTourists}
                onChange={handleChange}
                readOnly={Boolean(fixedTotalTourists)}
              />
            </div>

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
              <label>Message</label>
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={page.form_submit}>
              Send
            </button>
          </form>
        ) : (
          <div className={page.payment_step}>
            <div className={page.modal_breakdown}>
              <div className={page.modal_row}>
                <span className={page.modal_label}>Group size</span>
                <span className={page.modal_value}>
                  {paymentBreakdown.people} people
                </span>
              </div>
              <div className={page.modal_row}>
                <span className={page.modal_label}>Price per person</span>
                <span className={page.modal_value}>
                  ${pricePerPerson.toFixed(2)} USD
                </span>
              </div>
              <div className={page.modal_row}>
                <span className={page.modal_label}>
                  {payInFull ? "Payment per person" : `Deposit per person (${depositPercent}%)`}
                </span>
                <span className={page.modal_value}>
                  ${depositPerPerson.toFixed(2)} USD
                </span>
              </div>
              <div className={page.modal_row + " " + page.modal_row_balance}>
                <span className={page.modal_label}>
                  Booking reservation charges
                </span>
                <span className={page.modal_deposit}>
                  ${paymentBreakdown.dueToday.toFixed(2)} USD
                </span>
              </div>
              <div className={page.modal_row}>
                <span className={page.modal_label}>Total tour price</span>
                <span className={page.modal_value}>
                  ${paymentBreakdown.totalPrice.toFixed(2)} USD
                </span>
              </div>
              {!payInFull && (
                <>
                  <div className={page.modal_row}>
                    <span className={page.modal_label}>Remaining balance per person</span>
                    <span className={page.modal_value}>
                      ${remainingBalancePerPerson.toFixed(2)} USD
                    </span>
                  </div>
                  <div className={page.modal_row}>
                    <span className={page.modal_label}>Remaining total cash balance</span>
                    <span className={page.modal_value}>
                      ${paymentBreakdown.balance.toFixed(2)} USD
                    </span>
                  </div>
                </>
              )}
            </div>

            <p className={page.modal_note}>
              {payInFull ? (
                <>
                  This test tour charges the full{" "}
                  <strong>${paymentBreakdown.dueToday.toFixed(2)}</strong> today
                  so you can verify the live Stripe payment flow.
                </>
              ) : (
                <>
                  A {depositPercent}% booking deposit is required
                  to confirm your reservation. The remaining{" "}
                  <strong>${paymentBreakdown.balance.toFixed(2)}</strong> is paid in
                  person at the office, cash only.
                </>
              )}
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
                  <>
                    Pay ${paymentBreakdown.dueToday.toFixed(2)} Securely
                  </>
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
