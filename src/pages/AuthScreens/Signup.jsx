import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
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
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  useEffect(() => {
    // Setup password strength options once
    const options = {
      translations: zxcvbnEnPackage.translations,
      graphs: zxcvbnCommonPackage.adjacencyGraphs,
      dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
      },
    };
    zxcvbnOptions.setOptions(options);
  }, []);

  const [passwordStrength, setPasswordStrength] = useState(null);

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

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, password: value });

    if (value.trim()) {
      const result = zxcvbn(value);
      setPasswordStrength(result);
    } else {
      setPasswordStrength(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      validatePhone(value);
    }

    setFormData({ ...formData, [name]: value });

    if (name === "password" || name === "confirmPassword") {
      const otherField =
        name === "password" ? formData.confirmPassword : formData.password;

      if (otherField && value !== otherField) {
        setPasswordMatchError("Passwords do not match.");
      } else {
        setPasswordMatchError("");
      }
    }
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
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1606462471470-e62753e2cfaf?ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-sm border border-white/20"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create your account
        </h2>
        <p className="text-gray-300 text-center mb-8">Signup to join us</p>
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
        <form className="space-y-4">
       

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
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1B7339]"
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
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1B7339]"
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
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1B7339]"
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
                  : "border-white/30 focus:ring-[#1B7339]"
              } rounded-lg bg-white/20 text-white placeholder-gray-300`}
            />
          </div>

          {phoneError && (
            <p className="text-red-500 text-xs mb-2 ml-1">{phoneError}</p>
          )}

          {/* Password */}
          <div className="relative mb-2">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handlePasswordChange}
              className={`w-full pl-10 pr-10 py-2 rounded-lg bg-white/20 border text-white placeholder-gray-300 ${
                passwordStrength && passwordStrength.score < 2
                  ? "border-red-400 focus:ring-red-300"
                  : "border-white/30 focus:ring-[#1B7339]"
              } focus:ring-2 focus:border-transparent`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          {/* Password Strength Meter */}
          {passwordStrength && (
            <>
              <div className="mt-2">
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-2 transition-all duration-500 rounded-full ${
                      [
                        "bg-red-500",
                        "bg-orange-500",
                        "bg-yellow-500",
                        "bg-blue-500",
                        "bg-green-500",
                      ][passwordStrength.score]
                    }`}
                    style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                  ></div>
                </div>
                <p
                  className={`text-xs mt-1 ${
                    [
                      "text-red-600",
                      "text-orange-600",
                      "text-yellow-600",
                      "text-blue-600",
                      "text-green-600",
                    ][passwordStrength.score]
                  }`}
                >
                  {
                    ["Very Weak", "Weak", "Fair", "Good", "Strong"][
                      passwordStrength.score
                    ]
                  }
                </p>
              </div>

              {/* Weak Password Error */}
              {passwordStrength.score < 2 && (
                <p className="text-red-500 text-xs mt-1">
                  Please choose a stronger password before saving.
                </p>
              )}
            </>
          )}

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
              className={`w-full pl-10 pr-10 py-2 rounded-lg bg-white/20 border text-white placeholder-gray-300 ${
                passwordMatchError
                  ? "border-red-400 focus:ring-red-300"
                  : "border-white/30 focus:ring-[#1B7339]"
              } focus:ring-2 focus:border-transparent transition`}
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

          {/* Error text */}
          {passwordMatchError && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {passwordMatchError}
            </p>
          )}

          {/* create Button */}
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={
              passwordStrength &&
              passwordStrength.score < 2 &&
              !!passwordMatchError
            }
            className={`w-full font-semibold py-3 rounded-xl transition mt-4 shadow-md ${
              passwordStrength && passwordStrength.score < 2
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#1B7339] text-white hover:bg-[#16602F]"
            }`}
          >
            Create Account
          </button>
        </form>
        <div className="text-center mt-6 text-[#fff] text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#1B7339] font-semibold hover:underline"
          >
            Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
