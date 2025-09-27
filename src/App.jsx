
import React, { useState } from "react";
import Sidebar from "./components/SideBar/sidebar"; 
import OceanSidebar from "./components/SideBar/oceansidebar"; 
import SagarAiPage from "./components/SagarAI/SagarAi";
import "./App.css";

const App = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

  return (
    <div className="flex h-screen">
      {/* Main Sidebar */}
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

      {/* Ocean Sidebar */}
      <OceanSidebar isOpen={activeModule === "visualization"} />

      {/* Content Area */}
      <main className="flex-1 p-6 transition-all duration-300 ml-0">
        {activeModule === "SagarAi" ? (
          <SagarAiPage />
        ) : (
          <>
            <h1 className="text-2xl font-bold">{activeModule.toUpperCase()} Page</h1>
            <p className="mt-4 text-gray-600">
              This is the content area for {activeModule}.
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default App;

