import { useUser, UserButton, useSession } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import navBar from "../styles/components/navBar.module.scss";
import useAuthStore from "../store/auth";
import { AnimatePresence, motion } from "motion/react";

import { IoMenu, IoClose } from "react-icons/io5";

const Navbar = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  const navLinks = [
    { name: "About", path: "/" },
    { name: "Tour Expeditions", path: "/tour" },
    { name: "Contact", path: "/contact" },
  ];

  // const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  const handleBookNowClick = () => {
    if (location.pathname === "/tour") {
      const targetSection = document.getElementById("pick-your-tour");

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/tour", { state: { scrollToSection: "pick-your-tour" } });
    }

    setIsMenuOpen(false);
  };

  const handleLogoClick = (event) => {
    setIsMenuOpen(false);

    if (location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    event.preventDefault();
    navigate("/", { state: { scrollToTop: true } });
  };

  const handleNavLinkClick = (event, link) => {
    if (link.name !== "About") {
      setIsMenuOpen(false);
      return;
    }

    setIsMenuOpen(false);
    event.preventDefault();

    if (location.pathname === "/") {
      document
        .getElementById("why-travel-with-us")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    navigate("/", { state: { scrollToSection: "why-travel-with-us" } });
  };

  // React.useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.screenY > 10);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div className={navBar.navbar_container}>
      <nav className={navBar.navbar}>
        {/** Logo*/}
        <Link to="/" className={navBar.logo} onClick={handleLogoClick}>
          <img src="/Logo.png" alt="Logo" className={navBar.logo_Image} />
        </Link>

        {/* Desktop Nav */}
        <div className={navBar.nav_links}>
          <ul>
            {navLinks.map((link, i) => (
              <li key={i}>
                <a
                  className={navBar.nav_link}
                  href={link.path}
                  onClick={(event) => handleNavLinkClick(event, link)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Right, Clerk User button */}
        <div className={navBar.nav_right}>
          {currentUser?.role === "Admin" && (
            <button className={navBar.button_dashboard}>Dashboard</button>
          )}
          <button className={navBar.button_book} onClick={handleBookNowClick}>
            Book Now
          </button>
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<FaBook />}
                  onClick={() => navigate("/my-bookings")}
                ></UserButton.Action>
              </UserButton.MenuItems>
            </UserButton>
          ) : null}
        </div>
      </nav>
      {/* Hamburguer menu for mobile */}
      <nav className={navBar.navbar_mobile}>
        <Link to="/" className={navBar.logo} onClick={handleLogoClick}>
          <img src="/Logo.png" alt="Logo" className={navBar.logo_Image} />
        </Link>

        {/* SIDE BAR */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: 200,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                  opacity: { duration: 1, ease: "easeOut" },
                },
              }}
              transition={{
                delay: 0.1,
                x: { duration: 0.5, ease: "easeInOut" },
                opacity: { duration: 0.2, ease: "easeOut" },
              }}
              className={navBar.hamburguer_menu}
            >
              <button
                className={navBar.hamburguer_button_close}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <IoClose className={navBar.hamburguer_button_close_icon} />
              </button>
              <div className={navBar.hamburguer_links_sidebar}>
                <ul>
                  {navLinks.map((link, i) => (
                    <li key={i}>
                      <a
                        className={navBar.nav_link}
                        href={link.path}
                        onClick={(event) => handleNavLinkClick(event, link)}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={navBar.hamburguer_right}>
                {currentUser?.role === "Admin" && (
                  <button className={navBar.hamburguer_button_dashboard}>
                    Dashboard
                  </button>
                )}
                <button
                  className={navBar.button_book}
                  onClick={handleBookNowClick}
                >
                  Book Now
                </button>

                {user ? (
                  <UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Action
                        label="My Bookings"
                        labelIcon={<FaBook />}
                        onClick={() => navigate("/my-bookings")}
                      ></UserButton.Action>
                    </UserButton.MenuItems>
                  </UserButton>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isMenuOpen && (
          <div>
            <button
              className={navBar.hamburguer_button}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <IoMenu className={navBar.hamburguer_button_icon} />
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
