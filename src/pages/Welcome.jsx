import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logos/logo.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex flex-col justify-between h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1606462471470-e62753e2cfaf?ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80')", // 👷🏾‍♂️ Artisan-themed background
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

      {/* Top Section (Logo + Text) */}
      <div className="relative z-10 text-center text-white px-6 pt-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-bold mb-4 flex justify-center"
        >
          <img src={logo} alt="logo" className="h-[200px] w-auto" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-black max-w-md mx-auto text-lg"
        >
          Connecting skilled artisans with clients — anytime, anywhere.
        </motion.p>
      </div>

      {/* Bottom Section (Buttons) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 flex flex-col space-y-4 w-full max-w-xs mx-auto mb-24"
      >
        <button
          onClick={() => navigate("/signup")}
          className="w-full py-3 bg-[#1B7339] hover:bg-[#000] text-white font-semibold rounded-xl shadow-lg transition duration-300"
        >
          Sign up
        </button>

        <div className="flex items-center justify-center space-x-2 text-black text-sm">
          <span>Already have an account?</span>
          <button
            onClick={() => navigate("/login")}
            className="text-[#1B7339] font-semibold hover:underline hover:text-[#fff] transition"
          >
            Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;
