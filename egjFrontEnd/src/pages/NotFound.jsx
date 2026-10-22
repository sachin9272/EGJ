import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.badgeCircle}>
          <span style={styles.badgeText}>404</span>
        </div>
        <h1 style={styles.heading}>Expedition Route Not Found</h1>
        <p style={styles.sub}>
          The page or tour itinerary you are looking for does not exist or may have been moved.
          Explore our certified guided tours into the Amazon rainforest from Leticia.
        </p>
        <div style={styles.divider} />
        <div style={styles.actions}>
          <button style={styles.btnPrimary} onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button style={styles.btnSecondary} onClick={() => navigate("/tour")}>
            View Tour Expeditions
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "75vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #102110 0%, #1a3315 50%, #0d1a0d 100%)",
    fontFamily: "'Karla', sans-serif",
    padding: "3rem 1.5rem",
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(212, 170, 61, 0.3)",
    borderRadius: "1.5rem",
    padding: "3.5rem 2.5rem",
    maxWidth: "46rem",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5)",
    color: "#f4eed9",
  },
  badgeCircle: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "rgba(212, 170, 61, 0.15)",
    border: "2px solid #d4aa3d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
  },
  badgeText: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "#d4aa3d",
    fontFamily: "'Chivo', sans-serif",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#d4aa3d",
    fontFamily: "'Chivo', sans-serif",
  },
  sub: {
    fontSize: "1.05rem",
    lineHeight: "1.6",
    color: "#e2ddc7",
    marginBottom: "2rem",
  },
  divider: {
    height: "1px",
    background: "rgba(212, 170, 61, 0.2)",
    marginBottom: "2rem",
  },
  actions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: "linear-gradient(to right, #1e9146, #79a81c)",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.85rem 2rem",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s ease, opacity 0.2s ease",
  },
  btnSecondary: {
    background: "transparent",
    color: "#f4eed9",
    border: "1px solid rgba(212, 170, 61, 0.5)",
    borderRadius: "0.5rem",
    padding: "0.85rem 2rem",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s ease, background 0.2s ease",
  },
};

export default NotFound;
