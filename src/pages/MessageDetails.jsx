import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getOneMessage, resetSingleData } from "../redux/MessageSlice";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const MessageDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleData, loading, error } = useSelector((state) => state.messages);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    dispatch(getOneMessage(id));

    return () => {
      dispatch(resetSingleData());
    };
  }, [dispatch, id]);

useEffect(() => {
  if (singleData) {
    setMessages([
      {
        id: 1,
        sender: singleData.sender || "Artisan",
        text: singleData.message || "Hello! 👋 How can I help you today?",
        time: "10:00 AM",
        fromMe: false,
      },
      {
        id: 2,
        sender: "You",
        text: "Hi! I wanted to ask about your plumbing services.",
        time: "10:02 AM",
        fromMe: true,
      },
      {
        id: 3,
        sender: singleData.sender || "Artisan",
        text: "Sure! What exactly do you need fixed?",
        time: "10:03 AM",
        fromMe: false,
      },
      {
        id: 4,
        sender: "You",
        text: "There’s a leak under my kitchen sink that’s been getting worse.",
        time: "10:04 AM",
        fromMe: true,
      },
      {
        id: 5,
        sender: singleData.sender || "Artisan",
        text: "Ah okay, sounds like the pipe seal might be loose. I can check that out for you.",
        time: "10:06 AM",
        fromMe: false,
      },
      {
        id: 6,
        sender: "You",
        text: "How soon can you come over to take a look?",
        time: "10:07 AM",
        fromMe: true,
      },
      {
        id: 7,
        sender: singleData.sender || "Artisan",
        text: "Tomorrow morning works. Around 9:30 AM — would that be okay?",
        time: "10:08 AM",
        fromMe: false,
      },
      {
        id: 8,
        sender: "You",
        text: "That’s perfect 👍",
        time: "10:09 AM",
        fromMe: true,
      },
      {
        id: 9,
        sender: singleData.sender || "Artisan",
        text: "Great! Please send me your address.",
        time: "10:10 AM",
        fromMe: false,
      },
      {
        id: 10,
        sender: "You",
        text: "Sure — 45 Allen Avenue, Ikeja.",
        time: "10:11 AM",
        fromMe: true,
      },
      {
        id: 11,
        sender: singleData.sender || "Artisan",
        text: "Got it. Do you have any photos of the leak so I can bring the right tools?",
        time: "10:12 AM",
        fromMe: false,
      },
      {
        id: 12,
        sender: "You",
        text: "Yes, just a sec. Uploading now...",
        time: "10:13 AM",
        fromMe: true,
      },
      {
        id: 13,
        sender: "You",
        text: "✅ Sent!",
        time: "10:14 AM",
        fromMe: true,
      },
      {
        id: 14,
        sender: singleData.sender || "Artisan",
        text: "Perfect. I see it — looks manageable.",
        time: "10:15 AM",
        fromMe: false,
      },
      {
        id: 15,
        sender: singleData.sender || "Artisan",
        text: "It might take around an hour to fix, maybe less.",
        time: "10:16 AM",
        fromMe: false,
      },
      {
        id: 16,
        sender: "You",
        text: "Okay. How much will it cost roughly?",
        time: "10:17 AM",
        fromMe: true,
      },
      {
        id: 17,
        sender: singleData.sender || "Artisan",
        text: "Shouldn’t be more than ₦15,000 including materials.",
        time: "10:18 AM",
        fromMe: false,
      },
      {
        id: 18,
        sender: "You",
        text: "That sounds fair. 👍",
        time: "10:19 AM",
        fromMe: true,
      },
      {
        id: 19,
        sender: singleData.sender || "Artisan",
        text: "Awesome. I’ll confirm again tonight before heading over.",
        time: "10:20 AM",
        fromMe: false,
      },
      {
        id: 20,
        sender: "You",
        text: "Cool, thank you!",
        time: "10:21 AM",
        fromMe: true,
      },
      {
        id: 21,
        sender: singleData.sender || "Artisan",
        text: "You’re welcome! Just out of curiosity — is your building new or old?",
        time: "10:22 AM",
        fromMe: false,
      },
      {
        id: 22,
        sender: "You",
        text: "It’s about 7 years old. The plumbing has been decent until recently.",
        time: "10:23 AM",
        fromMe: true,
      },
      {
        id: 23,
        sender: singleData.sender || "Artisan",
        text: "Yeah, seals tend to wear out after a few years. A little maintenance goes a long way. 😊",
        time: "10:25 AM",
        fromMe: false,
      },
      {
        id: 24,
        sender: "You",
        text: "Makes sense. I’ll probably have you check the bathroom next time too.",
        time: "10:26 AM",
        fromMe: true,
      },
      {
        id: 25,
        sender: singleData.sender || "Artisan",
        text: "Haha no problem, that’s what I’m here for.",
        time: "10:27 AM",
        fromMe: false,
      },
      {
        id: 26,
        sender: "You",
        text: "😂 True!",
        time: "10:28 AM",
        fromMe: true,
      },
      {
        id: 27,
        sender: singleData.sender || "Artisan",
        text: "Alright then, I’ll see you tomorrow morning. Don’t forget to turn off the main tap tonight if the leak gets worse.",
        time: "10:29 AM",
        fromMe: false,
      },
      {
        id: 28,
        sender: "You",
        text: "Will do. Thanks again!",
        time: "10:30 AM",
        fromMe: true,
      },
      {
        id: 29,
        sender: singleData.sender || "Artisan",
        text: "Anytime! Have a good evening. 🌇",
        time: "10:31 AM",
        fromMe: false,
      },
      {
        id: 30,
        sender: "You",
        text: "You too 👋",
        time: "10:32 AM",
        fromMe: true,
      },
    ]);
  }
}, [singleData]);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "You",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fromMe: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] text-gray-500">
        Loading messages...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        Failed to load message.
      </div>
    );

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white shadow-sm sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-[#1B7339] hover:text-[#1B7339] mr-3"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="flex items-center mr-1">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-3">
            <img
              src={
                singleData?.avatar ||
                `https://i.pravatar.cc/150?img=${singleData?.id}`
              }
              alt={singleData?.user?.username || "User"}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="font-bold text-gray-800">
              {singleData?.user?.username || "Artisan"}
            </h2>
            <p className="text-xs text-gray-400">Active now</p>
          </div>
        </div>
      </div>

      {/* Chat body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
                msg.fromMe
                  ? "bg-[#1B7339] text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.fromMe ? "text-indigo-200" : "text-gray-400"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <div className="p-3 border-t bg-white flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-[#1B7339] hover:bg-[#1B7339] text-white rounded-full p-3 transition"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default MessageDetails;
