import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faEye,
  faEyeSlash,
  faEnvelope,
  faUser,
  faPhone,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation } from "framer-motion";

const Profile = () => {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Header animation controls
  const controls = useAnimation();
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll and animate header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
        controls.start({
          x: "50%",
          translateX: "-50%",
          scale: 0.9,
        });
      } else {
        setScrolled(false);
        controls.start({
          x: 0,
          translateX: "0%",
          scale: 1,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      validatePhone(value);
    }

    setFormData({ ...formData, [name]: value });
  };

  const validatePhone = (phone) => {
    const trimmed = phone.replace(/\s+/g, "");
    const regex = /^(?:\+234|0)([789][01]\d{8})$/;

    if (!trimmed) {
      setPhoneError("");
      return;
    }

    if (!regex.test(trimmed)) {
      setPhoneError(
        "Enter a valid Nigerian phone number (e.g. 0xxxxxxxxxx or +234xxxxxxxxxx)"
      );
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phoneError) {
      alert("Please fix the phone number before saving.");
      return;
    }

    console.log("Profile updated:", formData);
    alert("Profile updated successfully ✅");
  };

  return (
    <div className="p-4 bg-gray-50 min-h-[calc(100vh-80px)]">
      <div className="sticky top-0 z-30 bg-gray-50/90 backdrop-blur-md pt-3 pb-3 rounded-xl">
        <motion.h2
          animate={controls}
          className={`font-bold text-gray-800 mb-2 transition-all duration-300 ${
            scrolled ? "text-center text-xl" : "text-left text-3xl"
          }`}
        >
          Profile
        </motion.h2>
      </div>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-md p-6">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={
                profileImage ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-[#fff]"
            />
            <button
              type="button"
              className="absolute bottom-1 right-1 bg-[#1B7339] text-white rounded-full p-2 shadow hover:bg-[#1B7339] transition"
              onClick={() => fileInputRef.current.click()}
            >
              <FontAwesomeIcon icon={faCamera} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B7339] focus:border-transparent"
              required
            />
          </div>

          {/* Last Name */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B7339] focus:border-transparent"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B7339] focus:border-transparent"
              required
            />
          </div>

          {/* Phone */}
          <div className="relative mb-1">
            <FontAwesomeIcon
              icon={faPhone}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 rounded-xl border ${
                phoneError
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-200 focus:ring-[#1B7339]"
              } focus:ring-2 focus:border-transparent transition`}
            />
          </div>

          {phoneError && (
            <p className="text-red-500 text-xs mb-2 ml-1">{phoneError}</p>
          )}

          {/* Password */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B7339] focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B7339] focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </button>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[#1B7339] text-white font-semibold py-3 rounded-xl hover:bg-[#1B7339] transition mt-4 shadow-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
