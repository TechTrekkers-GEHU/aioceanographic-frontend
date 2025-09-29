import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import OceanSettingsToolbar from './Mapvisualization/oceansetting.jsx';
import { useState } from 'react';
import LegendTimeline from './Mapvisualization/timeline.jsx';
import { useMemo } from 'react';
import MapOverlay from './Mapvisualization/map_overlay.jsx';
// Placeholder data for hotspots - will replace with real data later
const hotspots = [
  { id: 1, name: 'Andaman & Nicobar Islands', lat: 12.61, lng: 92.83, score: 0.9 },
  { id: 2, name: 'Sunderbans', lat:  21.95, lng:  89.17, score: 0.95 },
  { id: 3, name: 'Live Coral Cover', lat: 9.9372, lng: 75.5525, score: 0.85 },
  { id: 4, name: 'Caribbean Sea', lat: 13.7000, lng: 72.1833, score: 0.6 },
  { id: 5, name: 'Goa Coastal Corals', lat: 15.3522, lng: 73.7782, score: 0.79 }
];


// [latitude, longitude] for setting frame bounds
const northEast    = [30.162, 102.0201];
const southWest    = [0.368, 56.914];
const customBounds = [southWest, northEast]
const DEFAULT_REGION = "Indian Ocean";

const BiodiversityHotspots = () => {
  const [layerType, setLayerType] = useState("hotspots"); 
  const [mapStyle, setMapStyle] = useState("standard");   
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [timeline, setTimeline] = useState(0);

  const [toggles, setToggles] = useState({
    fish: true,
    coral: true,
    mammals: true,
    mpaEstablished: true,
    mpaProposed: false,
    criticalHabitat: false,
    temperature: true,
    currents: false,
    depth: false,
  });
  const legend = useMemo(
      () => [
        { label: "Fish", className: "bg-primary" },
        { label: "Coral", className: "bg-accent" },
        { label: "Mammals", className: "bg-secondary" },
        { label: "MPAs", className: "bg-muted" },
        { label: "Critical habitat", className: "bg-destructive" },
        { label: "Contours", className: "bg-foreground/50" },
      ],
      []
    );
  
    
  const baseMapDefs = {
    standard: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "© OpenStreetMap",
      maxZoom: 19,
   },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "Imagery © Esri, Maxar, Earthstar Geographics",
      maxZoom: 19,
  },
    bathymetric: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
      attribution: "Ocean Basemap © Esri",
      maxZoom: 18,
      overlayUrl: "https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", // optional overlay
      overlayAttribution: "© OpenSeaMap contributors",
  },
};

const currentBase = baseMapDefs[mapStyle] || baseMapDefs.standard;

  return (
    <div className="space-y-6 w-full h-full">
      <OceanSettingsToolbar
        layerType={layerType}
        onLayerTypeChange={setLayerType}
        mapStyle={mapStyle}
        onMapStyleChange={setMapStyle}
        onSearch={(q) => console.log("search:", q)}
        onExport={() => console.log("export")}
        onToggleFullscreen={() => {
          if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
          else document.exitFullscreen?.();
        }}
      />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-700">Biodiversity Hotspots</h2>
      </div>

      <div className="bg-white p-1 rounded-xl shadow-lg flex-1 h-[calc(100vh-12rem)]">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <MapContainer
            bounds={customBounds}
            maxBounds={customBounds}
            maxBoundsViscosity={1.0}
            minZoom={5}
            maxZoom={8}
            className="w-full h-full"
          >
          <div className="pointer-events-none absolute inset-0">
          <div className="pointer-events-auto absolute bottom-5 right-4 z-[1100]">
          <MapOverlay
            region={region}
            toggles={toggles}
            onChange={(next) => {
              if (next.region) setRegion(next.region);
              if (next.toggles) setToggles(next.toggles);
            }}
          />
          </div>
          </div>
          <TileLayer
            url={currentBase.url}
            attribution={currentBase.attribution}
            maxZoom={currentBase.maxZoom}
          />  
          {mapStyle === "bathymetric" && (
            <TileLayer
              url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
              attribution="© OpenSeaMap contributors"
            />
          )}

          {hotspots.map(hotspot => (
            <CircleMarker
              key={hotspot.id}
              center={[hotspot.lat, hotspot.lng]}
              radius={20 * hotspot.score}
              fillColor="#ff3b3b"
              color="#ff0000"
              weight={1}
              opacity={0.5}
              fillOpacity={0.5}
            >
            <Popup>
              <div className="text-sm">
                <h3 className="font-semibold">{hotspot.name}</h3>
                <p>Biodiversity Score: {(hotspot.score * 100).toFixed(0)}%</p>
              </div>
            </Popup>
            </CircleMarker>
        ))}
        </MapContainer> 
        </div>
      </div>
      <LegendTimeline value={timeline} onChange={setTimeline} legend={legend} />
    </div>
  );
};

export default BiodiversityHotspots;