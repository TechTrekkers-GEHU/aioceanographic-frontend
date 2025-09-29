import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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


const BiodiversityHotspots = () => {
  return (
    <div className="space-y-6 w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-700">Biodiversity Hotspots</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg flex-1 h-[calc(100vh-12rem)]">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <MapContainer
          bounds={customBounds}
          maxBounds={customBounds}
          maxBoundsViscosity={1.0}
          minZoom={5}
          maxZoom={8}
          className="w-full h-full"
        >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
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
    </div>
  );
};

export default BiodiversityHotspots;