import { useState } from "react";

const Projects = () => {
  const [activeTab, setActiveTab] = useState("todo");

  const tabs = [
    { id: "todo", label: "To-Do's" },
    { id: "inProgress", label: "In Progress" },
    { id: "finished", label: "Finished" },
  ];

  return (
    <div className="p-4 bg-gray-50">
      {/* Header */}
      <div className="pt-3 pb-3 text-3xl font-bold">Projects</div>

      {/* Tabs */}
      <div className="flex justify-between mt-4 border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
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
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-full transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "todo" && (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-semibold mb-3">To-Do's</h2>
            <p className="text-gray-600">Tasks you haven’t started yet.</p>
          </div>
        )}
        {activeTab === "inProgress" && (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-semibold mb-3">In Progress</h2>
            <p className="text-gray-600">Ongoing projects and active jobs.</p>
          </div>
        )}
        {activeTab === "finished" && (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-semibold mb-3">Finished</h2>
            <p className="text-gray-600">Completed tasks and delivered work.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
