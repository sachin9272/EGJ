import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { useSession, useUser } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { getUser } from "./assets/API/Services/UserService";
import useAuthStore from "./store/auth";
import Footer from "./components/Footer";
import GoogleReviewsCarousel from "./components/GoogleReviewsCarousel";
import TourExpeditioins from "./pages/TourExpeditioins";
import BookingSuccess from "./pages/BookingSuccess";
import GamboaSacambu from "./pages/GamboaSacambu";
import Ayahuasca from "./pages/Ayahuasca";
import TwoDaysOneNight from "./pages/TwoDaysOneNight";
import ThreeDaysTwoNights from "./pages/ThreeDaysTwoNights";
import FourDaysThreeNights from "./pages/FourDaysThreeNights";
import FiveDaysFourNights from "./pages/FiveDaysFourNights";
import Contact from "./pages/Contact";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToSection) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.state]);

  return null;
}

function DeferredGoogleReviews() {
  const [shouldRender, setShouldRender] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (shouldRender) return;

    const trigger = triggerRef.current;
    if (!trigger || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: "900px 0px" }
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <>
      <div ref={triggerRef} aria-hidden="true" />
      {shouldRender ? <GoogleReviewsCarousel /> : null}
    </>
  );
}

function App() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  // Zustand Auth Store
  const logIn = useAuthStore((state) => state.login);
  const logOut = useAuthStore((state) => state.logout);

  // Clerk Hooks
  const { user } = useUser();
  const { session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !session) return;

      try {
        const token = await session.getToken();
        setToken(token);

        const data = await getUser(user.id, token);
        setUserData(data);
        // console.log("User Data:", data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user, session]); // only runs when user or session changes

  useEffect(() => {
    if (user && userData && token) {
      logIn(userData.data, token);
    } else {
      logOut();
    }
  }, [user, userData, token]); // runs when user, userData, or token changes

  return (
    <>
      <main className="min-h-[70vh]">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tour" element={<TourExpeditioins />} />
          <Route path="/tour/ayahuasca" element={<Ayahuasca />} />
          <Route path="/tour/gamboa-sacambu" element={<GamboaSacambu />} />
          <Route path="/tour/2-days-1-night" element={<TwoDaysOneNight />} />
          <Route path="/tour/3-days-2-nights" element={<ThreeDaysTwoNights />} />
          <Route path="/tour/4-days-3-nights" element={<FourDaysThreeNights />} />
          <Route path="/tour/5-days-4-nights" element={<FiveDaysFourNights />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* Shared post-payment pages */}
          <Route path="/success" element={<BookingSuccess />} />


        </Routes>
        <DeferredGoogleReviews />
        <Footer />
      </main>
    </>
  );
}

export default App;
