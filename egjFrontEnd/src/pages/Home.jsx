import Hero from "../components/home/Hero";
import home from "../styles/pages/home.module.scss";
import Navbar from "../components/NavBar";
import VideoSection from "../components/home/VideoSection";
import TravelWithUsSection from "../components/home/TravelWithUsSection";
import BePartOfUs from "../components/home/BePartOfUs";

function Home() {
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
