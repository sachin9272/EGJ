import { useState } from "react";
import {
  FaEnvelope,
  FaGlobe,
  FaLeaf,
  FaLocationDot,
  FaLock,
  FaPhone,
  FaRegCommentDots,
  FaRegUser,
} from "react-icons/fa6";
import Navbar from "../components/NavBar";
import { sendContactMessage } from "../assets/API/Services/ContactService";
import contact from "../styles/pages/contact.module.scss";

const contactDetails = [
  {
    icon: FaLocationDot,
    title: "Address",
    text: "Barrio Centro, Cra 9 #8-37, Leticia, Amazonas, Colombia",
  },
  {
    icon: FaEnvelope,
    title: "Email",
    text: "expeditionsgeorgeofthejungle@gmail.com",
    href: "mailto:expeditionsgeorgeofthejungle@gmail.com",
  },
  {
    icon: FaPhone,
    title: "Phone | Whatsapp",
    text: "+57 (320) 899-6144",
    href: "https://wa.me/573208996144",
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitStatus("loading");
    setStatusMessage("");

    try {
      await sendContactMessage(formData);
      setSubmitStatus("success");
      setStatusMessage("Your message has been sent. We’ll get back to you within 24 hours.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        nationality: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage(
        error.response?.data?.message ||
          "Unable to send your message right now. Please try again later."
      );
    }
  };

  return (
    <div className={contact.page_shell}>
      <Navbar />

      <main className={contact.page}>
        <section className={contact.hero}>
          <div className={contact.leaf_rule}>
            <span></span>
            <FaLeaf />
            <span></span>
          </div>
          <h1>Contact Us</h1>
          <p>We’ll get back to you within 24 hours.</p>
        </section>

        <form className={contact.form_card} onSubmit={handleSubmit}>
          <label className={contact.field}>
            <FaRegUser className={contact.field_icon} />
            <span>Full Name*</span>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

          <label className={contact.field}>
            <FaEnvelope className={contact.field_icon} />
            <span>Email Address*</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className={contact.field}>
            <FaPhone className={contact.field_icon} />
            <span>Phone | Whatsapp</span>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>

          <label className={contact.field}>
            <FaGlobe className={contact.field_icon} />
            <span>Nationality</span>
            <input
              type="text"
              name="nationality"
              placeholder="Enter your nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
          </label>

          <label className={`${contact.field} ${contact.message_field}`}>
            <FaRegCommentDots className={contact.field_icon} />
            <span>Your Message</span>
            <textarea
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
            />
          </label>

          <button
            className={contact.submit_button}
            type="submit"
            disabled={submitStatus === "loading"}
          >
            {submitStatus === "loading" ? "Sending..." : "Send Message"}
          </button>

          {statusMessage && (
            <p
              className={`${contact.status_message} ${
                submitStatus === "success"
                  ? contact.status_message_success
                  : contact.status_message_error
              }`}
            >
              {statusMessage}
            </p>
          )}

          <p className={contact.secure_note}>
            <FaLock /> Your information is safe and secure with us.
          </p>
        </form>

        <section className={contact.info_card}>
          {contactDetails.map(({ icon: Icon, title, text, href }) => {
            const content = (
              <>
                <span className={contact.info_icon}>
                  <Icon />
                </span>
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
              </>
            );

            const itemClassName = `${contact.info_item} ${
              title === "Email" ? contact.email_item : ""
            }`;

            return href ? (
              <a key={title} href={href} className={itemClassName}>
                {content}
              </a>
            ) : (
              <div key={title} className={itemClassName}>
                {content}
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default Contact;
