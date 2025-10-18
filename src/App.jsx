import NotFoundPage from "./pages/ErrorPages/NotFoundPage";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import NavBar from "./components/Navbar";
import Welcome from "./pages/Welcome";
import Loader from "./utils/Loader";

import { Suspense, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/AuthScreens/Signup";
import Login from "./pages/AuthScreens/Login";

// 👇 Moved inside BrowserRouter context
function AppLayout() {
  const location = useLocation();

  // paths where navbar should be hidden
  const hideNavbarRoutes = ["/", "/signup", "/login"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {shouldShowNavbar && <NavBar />}
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowSplash(false), 800);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center bg-white transition-opacity duration-700 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <Loader />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-white">
          <Loader />
        </div>
      }
    >
      {/* ✅ AppLayout is now INSIDE the BrowserRouter */}
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
