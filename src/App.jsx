import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import OceanSidebar from "./components/oceansidebar";
import "./App.css";

const App = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

  return (
    <div className="flex h-screen">
      {/* Main Sidebar */}
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

      {/* Ocean Sidebar (pushes content when open) */}
      <OceanSidebar isOpen={activeModule === "visualization"} />

      {/* Content Area */}
      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          activeModule === "visualization" ? "ml-0" : "ml-0"
        }`}
      >
        <h1 className="text-2xl font-bold">{activeModule.toUpperCase()} Page</h1>
        <p className="mt-4 text-gray-600">
          This is the content area for {activeModule}.
        </p>
      </main>
    </div>
  );
};

export default App;