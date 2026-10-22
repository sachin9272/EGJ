import { Link } from "react-router-dom";
import {
  FaSquareInstagram,
  FaSquareFacebook,
  FaSquareYoutube,
} from "react-icons/fa6";
import { FaTripadvisor } from "react-icons/fa";
import footer from "../styles/components/footer.module.scss";

import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";

function Footer() {
  const socialLinks = {
    facebook: "https://www.facebook.com/expeditionsgeorgeofthejungle",
    tripAdvisor:
      "https://www.tripadvisor.com/Attraction_Review-g317037-d12250134-Reviews-Expeditions_George_of_the_Jungle-Leticia_Amazonas_Department.html",
    instagram: "https://www.instagram.com/expeditionsgeorgeofthejungle/",
    youtube: "https://www.youtube.com/@expeditionsgeorgeofthejungle",
    whatsapp: "https://wa.me/573208996144",
    email: "expeditionsgeorgeofthejungle@gmail.com",
  };

  const handleEmailClick = (e) => {
    e.preventDefault();
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${socialLinks.email}`,
      "_blank"
    );
  };

  return (
    <footer className={footer.footer_container}>
      <div className={footer.footer_content_top}>
        {/* LOGO */}
        <div className={`${footer.logo_container} notranslate`} translate="no">
          <Link to="/" aria-label="Expeditions George of the Jungle Home">
            <img
              className={`${footer.logo_image} notranslate`}
              src="/Logo.webp"
              alt="Expeditions George of the Jungle"
              translate="no"
            />
          </Link>
        </div>
        <hr className={footer.separator} />
        {/* Quick Links */}
        <div>
          <h4 className={footer.quick_links_title}>Quick Links</h4>
          <div className={footer.quick_links_container}>
            <ul className={footer.quick_links}>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/tour">Tour Packages</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <ul className={footer.quick_links}>
              <li>
                <Link to="/refund-policy">Refund Policy</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className={footer.separator} />
        {/* Tour Links */}
        <div>
          <h4 className={footer.quick_links_title}>Amazon Tours</h4>
          <div className={footer.quick_links_container}>
            <ul className={footer.quick_links}>
              <li>
                <Link to="/tour/gamboa-sacambu">Gamboa &amp; Sacambu (1D)</Link>
              </li>
              <li>
                <Link to="/tour/2-days-1-night">2 Days &amp; 1 Night</Link>
              </li>
              <li>
                <Link to="/tour/3-days-2-nights">3 Days &amp; 2 Nights</Link>
              </li>
            </ul>
            <ul className={footer.quick_links}>
              <li>
                <Link to="/tour/4-days-3-nights">4 Days &amp; 3 Nights</Link>
              </li>
              <li>
                <Link to="/tour/5-days-4-nights">5 Days &amp; 4 Nights</Link>
              </li>
              <li>
                <Link to="/tour/ayahuasca">Ayahuasca Ceremony</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className={footer.separator} />
        {/* Social Media */}
        <div>
          <h4 className={footer.quick_links_title}>Follow Us</h4>
          <div className={footer.social_media_icons_container}>
            <div className={footer.social_media_icons}>
              <ul>
                <li>
                  <a
                    href={socialLinks.tripAdvisor}
                    target="_blank"
                    aria-label="TripAdvisor"
                    rel="noopener noreferrer"
                  >
                    <FaTripadvisor />
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    aria-label="Youtube"
                    rel="noopener noreferrer"
                  >
                    <FaSquareYoutube />
                  </a>
                </li>
              </ul>
            </div>

            <div className={footer.social_media_icons}>
              <ul>
                <li>
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    aria-label="Facebook"
                    rel="noopener noreferrer"
                  >
                    <FaSquareFacebook />
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    aria-label="Instagram"
                    rel="noopener noreferrer"
                  >
                    <FaSquareInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className={footer.separator} />
        {/* Contact US */}
        <address>
          <h4 className={footer.quick_links_title}>Contact Us</h4>
          <div className={footer.contact_us}>
            <ul>
              <li>
                <a
                  className={footer.contact_us_item}
                  href="#"
                  onClick={handleEmailClick}
                  aria-label="Email"
                  rel="noopener noreferrer"
                >
                  <MdEmail /> expeditionsgeorgeofthejungle@gmail.com
                </a>
              </li>
              <li>
                <a
                  className={footer.contact_us_item}
                  href={socialLinks.whatsapp}
                  target="_blank"
                  aria-label="Whatsapp"
                  rel="noopener noreferrer"
                >
                  <IoLogoWhatsapp />+57 (320) 899-6144{" "}
                </a>
              </li>
            </ul>
          </div>
          {/* 
          <ul>
              <li>Email: expeditionsgeorgeofthejungle@gmail.com </li>
              <li>Phone (Colombia): +57-320-899-6144 & + 57 (317) 529-9539 </li>
              <li>Phone (USA): +1 (680) 214-5633</li>
            </ul> */}
        </address>
      </div>
      <hr className={footer.separator_full} />
      <div className={footer.copyright_container}>
        <p className={footer.copyright_text}>
          ©2026 COPYRIGHT. EXPEDITIONS GEORGE OF THE JUNGLE ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}

export default Footer;
