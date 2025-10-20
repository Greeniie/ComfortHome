import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Message = ({ messages }) => {
  const navigate = useNavigate();
  const truncateText = (text, limit) =>
    text && text.length > limit ? text.slice(0, limit) + "..." : text || "";

  return (
    <div className="space-y-3 pb-24">
      {messages?.map((msg, index) => (
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
  );
};

export default Message;
