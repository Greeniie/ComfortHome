import { useState, useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Projects = () => {
  const [activeTab, setActiveTab] = useState("todo");
  const [searchQuery, setSearchQuery] = useState("");
  const controls = useAnimation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
        controls.start({ x: "50%", translateX: "-50%", scale: 0.9 });
      } else {
        setScrolled(false);
        controls.start({ x: 0, translateX: "0%", scale: 1 });
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
        "https://images.unsplash.com/photo-1560185127-6ed189bf04bb?w=600",
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
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
      status: "completed",
      dueDate: "Oct 10, 2025",
    },
  ];

  // 🔍 Filtered list with memoized search
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => p.status === activeTab)
      .filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [activeTab, searchQuery, projects]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Sticky Header + Tabs */}
      <div className="sticky top-0 z-30 bg-gray-50 pt-3 pb-3 mb-2">
        {/* Header */}
        <div className="pb-2 px-4">
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
        <div className="relative flex justify-between border-b border-gray-200 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchQuery(""); // reset search when switching tabs
              }}
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

      {/* 🔍 Search Bar (inside each tab) */}
      <div className="px-4 sticky top-[102px] bg-gray-50 z-20 pb-2 pt-1">
        <div className="relative mx-auto max-w-md">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder={`Search ${
              tabs.find((t) => t.id === activeTab)?.label
            }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 
             focus:ring-2 focus:ring-[#1B7339] focus:border-transparent 
             bg-white shadow-sm outline-none focus:outline-none 
             autofill:bg-white autofill:shadow-[0_0_0px_1000px_white_inset]"
          />
        </div>
      </div>

      {/* 🗂️ Tab Content */}
      <div className="pt-5 space-y-3 pb-24 px-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            No projects found for this search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects;
