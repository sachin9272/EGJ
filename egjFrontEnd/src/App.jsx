import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { useSession, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { getUser } from "./assets/API/Services/UserService";
import useAuthStore from "./store/auth";
import Footer from "./components/Footer";
import TourExpeditioins from "./pages/TourExpeditioins";
import Experiences from "./pages/Experiences";
// import Navbar from "./components/NavBar";
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
      {/* <Navbar /> */}
      <main className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour" element={<TourExpeditioins />} />
          <Route path="/experiences" element={<Experiences />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
