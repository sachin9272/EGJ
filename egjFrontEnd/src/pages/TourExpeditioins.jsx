import { useEffect, useState } from "react";
import { getTours } from "../assets/API/Services/ToursService";
import Navbar from "../components/NavBar";
import tour from "../styles/pages/tourExpeditions.module.scss";
import Hero from "../components/tourExpeditions/Hero";
import CardsSection from "../components/tourExpeditions/CardsSection";
import Faq from "../components/tourExpeditions/Faq";

function TourExpeditioins() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const getAllTours = async () => {
      const fetchedTours = await getTours();
      setTours(fetchedTours); // this is correct
    };
    getAllTours();
  }, []);

  return (
    <>
      <div className={`${tour.tours_container} grid-container`}>
        <Navbar />
        <Hero />
        <CardsSection />
        <Faq />
      </div>
    </>
  );
}

export default TourExpeditioins;
