// src/pages/ProjectDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendarAlt,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app you'd fetch this data by ID
  const project = {
    id,
    title: "Fix Plumbing Leak",
    description:
      "Repair a leaking pipe under the kitchen sink. The client mentioned mild water damage. Bring appropriate sealing tools and PVC pipe replacements.",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "completed", // can be 'todo', 'inProgress', or 'completed'
    dueDate: "Oct 25, 2025",
  };

  // Determine button label and visibility
  const getButtonLabel = () => {
    switch (project.status) {
      case "todo":
        return "Mark as In Progress";
      case "inProgress":
        return "Mark as Completed";
      default:
        return null;
    }
  };

  const handleStatusChange = () => {
    if (project.status === "todo") {
      alert("Project moved to In Progress");
    } else if (project.status === "inProgress") {
      alert("Project marked as Completed");
    }
  };

  const buttonLabel = getButtonLabel();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white shadow-sm sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-[#1B7339] mr-3 hover:opacity-80"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Project Details</h1>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 overflow-y-auto">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-56 object-cover"
          />
        </div>

        {/* Title + Info */}
        <h2 className="text-2xl font-bold text-gray-800 mt-4">{project.title}</h2>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-2">
          <span className="flex items-center gap-1 capitalize">
            <FontAwesomeIcon icon={faClipboardList} />
            {project.status.replace(/([A-Z])/g, " $1")}
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCalendarAlt} />
            {project.dueDate}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-700 leading-relaxed">
          {project.description}
        </p>

        {/* Action Button (conditionally rendered) */}
        {buttonLabel && (
          <div className="mt-6">
            <button
              onClick={handleStatusChange}
              className="w-full bg-[#1B7339] text-white py-3 rounded-xl font-semibold shadow hover:bg-green-700 transition"
            >
              {buttonLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
