"use client"

import React from "react"
import Sidebar from "./components/SideBar/sidebar"
import TopBar from "./components/TopBar/TopBar"
import SagarAiPage from "./components/SagarAI/SagarAi"

import Home from "./components/Home/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer/Footer"

const App = () => {

  return (
    <Router>
      <div className="flex flex-col h-screen min-h-screen w-full">
      <TopBar/>
    <div className="flex flex-1 min-w-0">
      <Sidebar />
    <main className="flex-1 min-w-0 flex flex-col">
      <div className="mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/sagarai" element={<SagarAiPage />} />
          <Route path="/analysis" element={<div>Analysis Page</div>} />
          <Route path="/visualization" element={<div>Visualization Page</div>} />
          <Route path="/data" element={<div>Data Sources Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    <Footer />
      </div>
    </main>
  </div>
</div>
    </Router>
  )
}
export default App
