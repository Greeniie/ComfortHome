import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "../redux/MessageSlice";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Messages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.messages);
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  const filteredMessages = useMemo(() => {
    if (!data?.length && !data?.comments?.length) return [];
    const messages = data.comments || data;
    return messages.filter((msg) =>
      (msg.user?.username || `Artisan ${msg.id}`)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const truncateText = (text, limit) =>
    text && text.length > limit ? text.slice(0, limit) + "..." : text || "";

  if (loading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] text-gray-500">
        Loading messages...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] text-red-500">
        Failed to load messages.
      </div>
    );

  return (
    <div className="p-4 bg-gray-50 min-h-[calc(100vh-80px)]">
      {/* Sticky Header + Search */}
      <div className="sticky top-0 z-30 bg-gray-50/90 backdrop-blur-md pt-3 pb-3 mb-2 shadow-sm rounded-xl">
        <motion.h2
          animate={controls}
          className={`font-bold text-gray-800 mb-3 transition-all duration-300 ${
            scrolled ? "text-center text-xl" : "text-left text-3xl"
          }`}
        >
          Messages
        </motion.h2>

        {/* Search bar */}
        <div className="relative mx-auto max-w-md">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Message List */}
      {filteredMessages?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 text-gray-400">
          <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-5xl mb-3" />
          <p>No messages found</p>
        </div>
      ) : (
        <div className="space-y-3 pb-24">
          {filteredMessages?.map((msg, index) => (
            <motion.div
              key={msg.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/messages/${msg.id || index}`)}
              className="flex items-center bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-3">
                <img
                  src={msg.avatar || `https://i.pravatar.cc/150?img=${msg?.id}`}
                  alt={msg?.user?.username || "User"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Message Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 text-sm truncate">
                  {msg.user?.username || `Artisan ${index + 1}`}
                </h3>
                <p className="text-gray-500 text-sm truncate">
                  {truncateText(msg.body || "Hey there! Let's chat soon.", 45)}
                </p>
              </div>

              {/* Timestamp */}
              <div className="text-xs text-gray-400 ml-3 whitespace-nowrap">
                {msg.time || "10:30 AM"}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
