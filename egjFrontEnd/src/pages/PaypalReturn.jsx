import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { capturePaypalOrder } from "../assets/API/Services/PaypalService";

/**
 * /paypal/return
 *
 * PayPal redirects the user here after they approve the payment.
 * URL params:
 *   ?token=PAYPAL_ORDER_ID  — set automatically by PayPal
 *   &bookingId=MONGO_ID     — appended by us when building the return_url
 *
 * Flow:
 *  1. Read token + bookingId from URL
 *  2. Call backend capture-order endpoint
 *  3. Redirect to /success or /cancel on error
 *
 * NOTE: The booking is officially marked as paid by the PayPal webhook
 * (PAYMENT.CAPTURE.COMPLETED). This page just triggers the capture and
 * shows a friendly "processing" screen while PayPal settles.
 */
function PaypalReturn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasCaptured = useRef(false); // prevent double-fire in React StrictMode
  const [status, setStatus] = useState("processing"); // "processing" | "error"

  useEffect(() => {
    if (hasCaptured.current) return;
    hasCaptured.current = true;

    const orderId = searchParams.get("token");
    const bookingId = searchParams.get("bookingId");

    if (!orderId || !bookingId) {
      setStatus("error");
      setTimeout(() => navigate("/paypal/cancel"), 3000);
      return;
    }

    const capture = async () => {
      try {
        await capturePaypalOrder(orderId, bookingId);
        // Give the webhook a moment then navigate to success
        setTimeout(() => navigate("/success"), 1500);
      } catch (err) {
        console.error("PayPal capture failed:", err);
        setStatus("error");
        setTimeout(() => navigate("/paypal/cancel"), 3000);
      }
    };

    capture();
  }, [searchParams, navigate]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {status === "processing" ? (
          <>
            <div style={styles.spinner} />
            <h1 style={styles.heading}>Processing your payment…</h1>
            <p style={styles.sub}>
              Please wait while we confirm your payment with PayPal.
              <br />
              Do not close this tab.
            </p>
          </>
        ) : (
          <>
            <div style={styles.errorIcon}>✕</div>
            <h1 style={styles.headingError}>Something went wrong</h1>
            <p style={styles.sub}>
              We could not confirm your payment. Redirecting you back…
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ── Inline styles (no extra SCSS file needed for a transient page) ──────────
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
    border: "1px solid rgba(126,161,91,0.3)",
    borderRadius: "1.5rem",
    padding: "4rem 3rem",
    maxWidth: "48rem",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
    color: "#f4eed9",
  },
  spinner: {
    width: "56px",
    height: "56px",
    border: "5px solid rgba(126,161,91,0.25)",
    borderTopColor: "#7ea15b",
    borderRadius: "50%",
    animation: "paypal-spin 0.85s linear infinite",
    margin: "0 auto 2rem",
  },
  heading: {
    fontSize: "2.4rem",
    fontWeight: 700,
    color: "#7ea15b",
    marginBottom: "1rem",
  },
  headingError: {
    fontSize: "2.4rem",
    fontWeight: 700,
    color: "#e05252",
    marginBottom: "1rem",
  },
  errorIcon: {
    fontSize: "4rem",
    color: "#e05252",
    marginBottom: "1rem",
  },
  sub: {
    fontSize: "1.5rem",
    color: "rgba(244,238,217,0.75)",
    lineHeight: 1.6,
  },
};

// Inject keyframes once
if (typeof document !== "undefined" && !document.getElementById("paypal-spin-kf")) {
  const style = document.createElement("style");
  style.id = "paypal-spin-kf";
  style.textContent = `@keyframes paypal-spin { to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
}

export default PaypalReturn;
