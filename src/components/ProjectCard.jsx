import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ id, title, description, imageUrl, status, dueDate }) => {
  const navigate = useNavigate();

  const statusColors = {
    todo: "bg-gray-100 text-gray-700",
    inProgress: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
  };

  const statusLabels = {
    todo: "To-Do",
    inProgress: "In Progress",
    completed: "Completed",
  };

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => navigate(`/projects/${id}`,)}
      className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4 cursor-pointer active:shadow-md transition-shadow"
    >
      {/* Image */}
      {imageUrl && (
        <div className="w-full h-40 bg-gray-200">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}
        >
          {statusLabels[status]}
        </span>

        <h3 className="mt-2 text-lg font-bold text-gray-800">{title}</h3>
        <p className="mt-1 text-gray-600 text-sm line-clamp-2">{description}</p>

        <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
          <span>
            {status === "completed" ? "Completed" : "Due"}: {dueDate || "N/A"}
          </span>
          <span className="text-[#1B7339] font-medium text-sm">
            View →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
