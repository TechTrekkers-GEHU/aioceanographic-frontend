import React from "react";
import Sidebar from "./components/sidebar";
import TopBar from "./components/TopBar/TopBar";
import "./App.css"; 
import Home from "./components/Home"; 

const Footer = () => {
  return (
    <div className="footer-container text-gray-600 bg-footer-light border-t border-gray-300 flex flex-col items-center justify-center py-4">
        <div className="text-sm">
            <a href="#api-doc" className="hover:underline text-marine-blue">Api Documentation</a> | <a href="#contacts" className="hover:underline text-marine-blue">Contacts</a>
        </div>
        <div className="text-xs mt-1">
            2025 Tech Trekkers
        </div>
    </div>
  );
};

const App = () =>{
  // State for active module, matching sidebar's required prop
  const [activeModule, setActiveModule] = React.useState('dashboard');

  return (
    <div className="app-container"> 
      <div className="topbar-container">
        <TopBar/> 
      </div>
      
      <div className="sidebar-container-wrapper">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      </div>
      
      <div className="main-content-wrapper bg-background-light">
        {activeModule === 'dashboard' && <Home />}
        {activeModule !== 'dashboard' && (
          <div className="text-center p-10 text-gray-500">
            Content for {activeModule} module coming soon...
          </div>
        )}
      </div>

      <Footer />
    </div>
  )

}
export default App;
