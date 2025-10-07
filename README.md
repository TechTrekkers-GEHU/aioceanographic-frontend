# 🌊 AIOceanographic Frontend — Technical Documentation

The **DeepSea Drive** is a modern, responsive, and AI-assisted web interface for visualizing, analyzing, and interacting with marine and oceanographic datasets.  
It serves as the **client-side application** that communicates with backend microservices to present real-time data insights through interactive visualization and intelligent querying.

---

## 📚 Table of Contents
1. [Overview](#overview)  
2. [Technology Stack](#technology-stack)  
3. [Core Features](#core-features)  
4. [Architecture & Design Flow](#architecture--design-flow)  
5. [Development Setup](#development-setup)    
6. [Summary](#summary)

---

## 🧭 Overview

The DeepSea Drive transforms heterogeneous marine datasets spanning physical, chemical, and biological parameters — into a unified, interactive experience.  
It provides scientists, researchers, and data analysts with a visual exploration tool to better understand marine trends and behaviors through maps, charts, and AI assistance.

This UI is designed to interface seamlessly with the backend API layer, enabling **real-time data retrieval, visualization, and analysis**.

---

## ⚙️ UI Technology Stack

| Layer | Technology |
|--------|-------------|
| **Framework** | React (Vite-based setup) |
| **Styling** | TailwindCSS |
| **Visualization** | Map and chart modules (Leaflet / D3 compatible) |
| **AI Integration** | SagarAI conversational assistant |
| **Build Tool** | Vite |
| **Language** | JavaScript (ES6+) |
| **Deployment** | Vercel / Docker / Nginx compatible |
| **Integration** | RESTApi |

All design components are implemented with **TailwindCSS**, ensuring modularity, responsiveness, and performance across devices.

---

## 🧠 Core Features

### 🗺️Visualization  
- Displays  patterns of marine parameters like salinity, temperature, and chlorophyll levels.  
- Map visualization of different layers(hotspots,edna etc..) with interactive layers and dynamic zoom functionality.  
- Real-time data fetched directly from backend APIs.

### 📊 Data Analysis Dashboard  
- Analytical modules for comparing and visualizing multi-parameter datasets.  
- Chart-based analysis using reusable visualization components.  
- Supports filtering, parameter selection, and result interpretation.

### 🤖 SagarAI Assistant  
- AI-powered conversational interface for querying datasets in natural language.  
- Provides contextual insights and dynamic visual responses.  
- Works in sync with the backend’s AI microservice.

### 📁 Data Source Management  
- Handles dataset selection, preview, and loading from the backend.  
- Ensures streamlined data flow between client and server components.

### ⚙️ Service & Utility Layers  
- `/api` — manages API communication with backend endpoints.  
- `/services` — includes high-level data handling logic.  
- `/utils` — contains shared constants, formatters, and helper functions

---

## 🏗️ Architecture & Design Flow

1. **User Interface Layer:**  
   Built with modular React components — Home, Dashboard, Sidebar, Topbar, and MapVisualization.

2. **API Interaction Layer:**  
   The `/api` module abstracts API calls and handles all interactions with the backend services.

3. **Data Processing Layer:**  
   `/services` transforms and structures incoming API data into consumable formats for visualization components.

4. **Visualization Layer:**  
   `/Analysis` and `/Visualization` render processed data into maps, graphs, and charts dynamically.

5. **AI Integration Layer:**  
   `/SagarAI` connects to backend AI endpoints for conversational querying and intelligent insights.

---

## 🧪 Development Setup

### 🔧 Setup Instructions
```bash
# clone the repository
git clone https://github.com/TechTrekkers-GEHU/aioceanographic-frontend.git
cd aioceanographic-frontend

# install dependencies
npm install

# start development server
npm run dev

#Docker
docker compose up --build
```
---
### Concise summary

The **DeepSea Drive** converts oceanographic datasets into interactive, layered visualizations with AI-enhanced insights. It serves as the client-side presentation layer, fully dependent on backend services for data, tiles, and AI computation.
Its design emphasizes clarity, scientific accuracy, responsiveness, and interactivity, providing users with actionable insights into marine ecosystems.

“Transforming complex ocean data into interactive and intelligent visual insight.”

```
##Note
-This repository contains only the frontend UI.
-It is fully dependent on backend microservices, which provide datasets, map layers, and AI/analysis results.
-The frontend communicates with the backend via REST APIs (e.g., /sagarAI, /analysis) to fetch all necessary data for visualizations and dashboards.
