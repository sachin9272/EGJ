import { useNavigate } from "react-router-dom";

/**
 * /paypal/cancel
 * Shown when the user clicks "Cancel & Return" on the PayPal checkout page.
 */
function PaypalCancel() {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.icon}>✕</div>
        <h1 style={styles.heading}>Payment Cancelled</h1>
        <p style={styles.sub}>
          You cancelled the PayPal payment. Your booking has <strong>not</strong>{" "}
          been charged and will expire shortly if left unpaid.
        </p>
        <div style={styles.actions}>
          <button style={styles.primaryBtn} onClick={() => navigate(-1)}>
            Try Again
          </button>
          <button style={styles.secondaryBtn} onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
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
    border: "1px solid rgba(224,82,82,0.35)",
    borderRadius: "1.5rem",
    padding: "4rem 3rem",
    maxWidth: "48rem",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
    color: "#f4eed9",
  },
  icon: {
    fontSize: "5rem",
    color: "#e05252",
    marginBottom: "1.2rem",
    lineHeight: 1,
  },
  heading: {
    fontSize: "2.6rem",
    fontWeight: 700,
    color: "#e05252",
    marginBottom: "1rem",
  },
  sub: {
    fontSize: "1.5rem",
    color: "rgba(244,238,217,0.75)",
    lineHeight: 1.7,
    marginBottom: "2.5rem",
  },
  actions: {
    display: "flex",
    gap: "1.2rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "1rem 2.4rem",
    borderRadius: "0.8rem",
    border: "none",
    background: "#7ea15b",
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  secondaryBtn: {
    padding: "1rem 2.4rem",
    borderRadius: "0.8rem",
    border: "1px solid rgba(244,238,217,0.35)",
    background: "transparent",
    color: "#f4eed9",
    fontSize: "1.5rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
};

export default PaypalCancel;
