import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { createDirectPaypalOrder } from "../assets/API/Services/PaypalService";
import page from "../styles/components/bookingModal.module.scss";

export default function BookingModal({
  tourTitle,
  tourPrice,
  depositAmount,
  onClose,
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationality: "",
    email: "",
    phone: "",
    tourPackage: tourTitle,
    totalTourists: "1",
    dates: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill out the required fields (Name and Email).");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handlePayNow = async () => {
    setLoading(true);
    setError(null);
    try {
      const { approvalUrl } = await createDirectPaypalOrder({
        amount: depositAmount,
        fullPrice: tourPrice,
        formData: formData,
        currency: "USD",
        description: `${tourTitle} — 30% deposit (full price $${tourPrice})`,
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
              <label>How many people will be going with you?</label>
              <input
                type="number"
                name="totalTourists"
                min="1"
                value={formData.totalTourists}
                onChange={handleChange}
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
                <span className={page.modal_label}>Full tour price</span>
                <span className={page.modal_value}>${tourPrice.toFixed(2)} USD</span>
              </div>
              <div className={page.modal_row}>
                <span className={page.modal_label}>Deposit due today (30%)</span>
                <span className={page.modal_deposit}>${depositAmount.toFixed(2)} USD</span>
              </div>
              <div className={page.modal_row + " " + page.modal_row_balance}>
                <span className={page.modal_label}>Remaining balance</span>
                <span className={page.modal_value}>
                  ${(tourPrice - depositAmount).toFixed(2)} USD
                </span>
              </div>
            </div>

            <p className={page.modal_note}>
              Secure your place with a 30% deposit via PayPal. The remaining{" "}
              <strong>${(tourPrice - depositAmount).toFixed(2)}</strong> is
              payable on arrival in Leticia.
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
                    Pay ${depositAmount.toFixed(2)} with PayPal
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
              🔒 Payments are processed securely by PayPal
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
