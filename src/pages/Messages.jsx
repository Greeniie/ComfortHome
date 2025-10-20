import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "../redux/MessagesSlice";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Message from "../components/Message";

const Messages = () => {
  const dispatch = useDispatch();
  
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
      <Message messages={filteredMessages}/>
      )}
    </div>
  );
};

export default Messages;
