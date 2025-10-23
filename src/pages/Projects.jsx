import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const [activeTab, setActiveTab] = useState("todo");
  const controls = useAnimation();
  const [scrolled, setScrolled] = useState(false);

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

  const tabs = [
    { id: "todo", label: "To-Do's" },
    { id: "inProgress", label: "In Progress" },
    { id: "completed", label: "Completed" },
  ];

  const projects = [
    {
      id: 1,
      title: "Fix Plumbing Leak",
      description: "Repair a leaking pipe under the kitchen sink.",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
      status: "todo",
      dueDate: "Oct 25, 2025",
    },
    {
      id: 3,
      title: "Install New Air Conditioner",
      description: "Replace old AC with a modern energy-efficient model.",
      imageUrl:
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=600",
      status: "todo",
      dueDate: "Oct 15, 2025",
    },
    {
      id: 2,
      title: "Change the Kitchen Faucet",
      description: "Change faucet to a modern one for a cozy look.",
      imageUrl:
        "https://images.openai.com/thumbnails/url/J_MHAnicu5meUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw40TwlxDQjMCHE1dzfPCMmJiPR0j8pJyrTINCs3DHT31DU1NnQzNc6Iz053VCu2NTQAAO1bI6Y",
      status: "todo",
      dueDate: "Oct 22, 2025",
    },
    {
      id: 4,
      title: "Paint the Living Room",
      description: "Use warm neutral colors for a cozy look.",
      imageUrl:
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=600",
      status: "inProgress",
      dueDate: "Oct 22, 2025",
    },
    {
      id: 5,
      title: "Install New Ceiling Fan",
      description: "Replace old fan with a modern energy-efficient model.",
      imageUrl:
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=600",
      status: "completed",
      dueDate: "Oct 10, 2025",
    },
  ];

  const filteredProjects = projects.filter((p) => p.status === activeTab);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* ✅ Sticky Header + Tabs */}
      <div className="sticky top-0 z-30 bg-gray-50/90 backdrop-blur-md pt-3 pb-3 mb-2 shadow-sm">
        {/* Header */}
        <div className="pb-2">
          <motion.h2
            animate={controls}
            className={`font-bold text-gray-800 transition-all duration-300 ${
              scrolled ? "text-center text-xl" : "text-left text-3xl"
            }`}
          >
            Projects
          </motion.h2>
        </div>

        {/* Tabs */}
        <div className="relative flex justify-between border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 text-center py-3 font-medium text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-[#1B7339]"
                  : "text-gray-500 hover:text-[#1B7339]"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="pt-5 space-y-3 pb-24">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            No projects in this section yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects;
