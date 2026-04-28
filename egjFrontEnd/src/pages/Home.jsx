import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/home/Hero";
import home from "../styles/pages/home.module.scss";
import Navbar from "../components/NavBar";
import VideoSection from "../components/home/VideoSection";
import TravelWithUsSection from "../components/home/TravelWithUsSection";
import BePartOfUs from "../components/home/BePartOfUs";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(location.pathname, { replace: true, state: null });
      return;
    }

    if (!location.state?.scrollToSection) return;

    document
      .getElementById(location.state.scrollToSection)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  return (
    <>
      <div className={`${home.home_container} grid-container`}>
        <Navbar className={`${home.navbar}`} />
        <Hero />
        <VideoSection />
        <TravelWithUsSection />
        <BePartOfUs />
      </div>
    </>
  );
}

export default Home;
