import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Placeholder data for hotspots - replace with real data later
const hotspots = [
  { id: 1, name: 'Great Barrier Reef', lat: -18.2871, lng: 147.6992, score: 0.9 },
  { id: 2, name: 'Coral Triangle', lat: -2.8991, lng: 120.9359, score: 0.95 },
  { id: 3, name: 'Galapagos Islands', lat: -0.9538, lng: -90.9656, score: 0.85 },
  { id: 4, name: 'Caribbean Sea', lat: 15.7835, lng: -78.7837, score: 0.8 }
];

const BiodiversityHotspots = () => {
  return (
    <div className="space-y-6 w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-700">Biodiversity Hotspots</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg flex-1 h-[calc(100vh-12rem)]">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <MapContainer
            center={[0, 0]}
            zoom={2}
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