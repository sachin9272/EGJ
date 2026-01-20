import Navbar from "../components/NavBar";
import experiences from "../styles/pages/experiences.module.scss";
import HeroSection from "../components/Experiences/HeroSection";

function Experiences() {
  return (
    <div className={`${experiences.experiences_container} grid-container`}>
      <Navbar />
      <HeroSection />
    </div>
  );
}

export default Experiences;
