import { useNavigate } from "react-router-dom";

/**
 * /success
 * Generic booking success page — shown after both Stripe and PayPal payments.
 */
function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.checkCircle}>
          <span style={styles.checkMark}>✓</span>
        </div>
        <h1 style={styles.heading}>Booking Confirmed!</h1>
        <p style={styles.sub}>
          Your payment was successful and your expedition is booked. 🌿
          <br />
          A confirmation email has been sent to your inbox.
        </p>
        <div style={styles.divider} />
        <p style={styles.note}>
          Our team will reach out with full itinerary details shortly. Get ready
          for an unforgettable adventure with{" "}
          <strong>Expeditions George of the Jungle</strong>!
        </p>
        <button style={styles.btn} onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1a2f1a 0%, #2d4a1e 50%, #1a2f1a 100%)",
    fontFamily: "'Karla', sans-serif",
    padding: "2rem",
  },
  card: {
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(126,161,91,0.4)",
    borderRadius: "1.5rem",
    padding: "4rem 3rem",
    maxWidth: "52rem",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
    color: "#f4eed9",
  },
  checkCircle: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7ea15b, #5c7a40)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 2rem",
    boxShadow: "0 8px 24px rgba(126,161,91,0.4)",
  },
  checkMark: {
    fontSize: "3.2rem",
    color: "#fff",
    fontWeight: 700,
    lineHeight: 1,
  },
  heading: {
    fontSize: "2.8rem",
    fontWeight: 700,
    color: "#7ea15b",
    marginBottom: "1rem",
  },
  sub: {
    fontSize: "1.6rem",
    color: "rgba(244,238,217,0.85)",
    lineHeight: 1.7,
    marginBottom: "2rem",
  },
  divider: {
    height: "1px",
    background: "rgba(126,161,91,0.25)",
    margin: "2rem 0",
  },
  note: {
    fontSize: "1.4rem",
    color: "rgba(244,238,217,0.65)",
    lineHeight: 1.7,
    marginBottom: "2.5rem",
  },
  btn: {
    padding: "1.1rem 3rem",
    borderRadius: "0.8rem",
    border: "none",
    background: "linear-gradient(135deg, #7ea15b, #5c7a40)",
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(126,161,91,0.35)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  },
};

export default BookingSuccess;
