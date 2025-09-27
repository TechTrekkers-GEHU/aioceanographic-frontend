"use client"

import React from "react"
import Sidebar from "./components/SideBar/sidebar"
import TopBar from "./components/TopBar/TopBar"
import SagarAiPage from "./components/SagarAI/SagarAi"

import Home from "./components/Home/Home"
import { BrowserRouter as Router, Route, Routes ,useLocation} from "react-router-dom"
import { Footer } from "./components/Footer/Footer"
import SettingsPage from "./components/Setting/settings"
import DataSources from "./components/DataSource/datasources"

const AppShell = () => {
  const {pathname} = useLocation();
  const hideFooter = pathname.toLowerCase().startsWith("/sagarai");
  const hideHeader = pathname.toLowerCase().startsWith("/sagarai");
  return (
    <div className="flex flex-col h-screen min-h-screen w-full">
     {!hideHeader && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <TopBar/>
        </div>
      )}
    <div className={`flex flex-1 min-w-0 ${!hideHeader ? 'pt-16' : 'pt-0'}`}>
    <div className={`shrink-0 sticky ${hideHeader ? "top-0" : "top-16"} h-[calc(100vh-4rem)]  bg-white`}>
          <Sidebar />
      </div>
    <main className="flex-1 min-w-0 flex flex-col">
      <div className="mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/sagarai" element={<SagarAiPage />} />
          <Route path="/analysis" element={<div>Analysis Page</div>} />
          <Route path="/visualization" element={<div>Visualization Page</div>} />
          <Route path="/data" element={<DataSources/>} />
          <Route path="/settings" element={<SettingsPage/>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    {!hideFooter && <Footer />}
      </div>
    </main>
  </div>
</div>
  );
};

const App = () => {
  return (
  <Router>
    <AppShell />
  </Router>
  );
};
export default App;
