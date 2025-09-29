"use client"

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "./components/SideBar/sidebar";
import OceanSidebar from "./components/SideBar/oceansidebar"; 
import TopBar from "./components/TopBar/TopBar";
import Home from "./components/Home/Home";
import SagarAiPage from "./components/SagarAI/SagarAi";
import AnalysisSideBar from "./components/SideBar/analysisSideBar";
import Visualization from "./components/Visualization/Visualization"; 
import Analysis from "./components/Analysis/Analysis"
import DataSources from "./components/DataSource/datasources";
import SettingsPage from "./components/Setting/settings";
import { Footer } from "./components/Footer/Footer";
import LandingPage from "./components/LandingPage/LandingPage"; 

const AppShell = () => {
  const { pathname } = useLocation();
  const isVisualizationPage = pathname.toLowerCase().startsWith("/visualization");
  const isAnalysisPage = pathname.toLowerCase().startsWith("/analysis");

  const [activeVizId, setActiveVizId] = useState("param");
  const [activeAnalysisId, setActiveAnalysisId] = useState("multivarentCrossDomain");

  const hideFooter = ["/sagarai", "/visualization"].some(path =>
    pathname.toLowerCase().startsWith(path)
  );
  const hideHeader = pathname.toLowerCase().startsWith("/sagarai");

  return (
    <div className="flex h-screen w-full">
      <div className="shrink-0 h-screen bg-white">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        {!hideHeader && (
          <div className="w-full">
            <TopBar />
          </div>
        )}

        <div className="flex flex-1 min-h-0">
          {isVisualizationPage && (
            <div className="shrink-0 h-[calc(100vh-4rem)] bg-white">
              <OceanSidebar activeItem={activeVizId} onSelect={setActiveVizId} />
            </div>
          )}

          {isAnalysisPage && (
            <div className="shrink-0 h-[calc(100vh-4rem)] bg-white">
              <AnalysisSideBar activeItem={activeAnalysisId} onSelect={setActiveAnalysisId} />
            </div>
          )}

          <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
            <div className="mx-auto w-full">
              <Routes>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/sagarai" element={<SagarAiPage />} />
                
                <Route 
                path="/analysis" 
                element={<Analysis activeAnalysisId={activeAnalysisId}/>} 
                />

                <Route
                  path="/visualization"
                  element={<Visualization activeVizId={activeVizId} />}
                />

                <Route path="/data" element={<DataSources />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<div>404 Not Found</div>} />
              </Routes>
            </div>
            {!hideFooter && <Footer />}
          </main>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<AppShell />} />
      </Routes>
    </Router>
  );
};

export default App;