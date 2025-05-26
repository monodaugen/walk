/ Ring Walk Route Suggestion Tool - Full App with README and Deployment Guide

// ---- React Component (src/App.jsx) ----

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const App = () => {
  const [startPoint, setStartPoint] = useState(null);
  const [time, setTime] = useState(45);
  const [pace, setPace] = useState(12);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setStartPoint([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  const calculateRoutes = async () => {
    if (!startPoint || time < 5 || pace < 5) return alert("Invalid input");

    const distance = time / pace; // km
    const distanceMeters = distance * 1000;

    setLoading(true);
    setRoutes([]);

    const newRoutes = [];
    const numRoutes = 5;

    for (let i = 0; i < numRoutes; i++) {
      try {
        const response = await axios.get(
          `https://router.project-osrm.org/route/v1/foot/${startPoint[1]},${startPoint[0]}?overview=full&geometries=geojson&roundtrip=true&steps=false&radius=${distanceMeters}`
        );

        const coords = response.data.routes[0].geometry.coordinates.map(
          ([lng, lat]) => [lat, lng]
        );
        const routeDistance = response.data.routes[0].distance;
        const routeDuration = response.data.routes[0].duration;

        if (
          routeDistance >= distanceMeters * 0.9 &&
          routeDistance <= distanceMeters * 1.1
        ) {
          newRoutes.push({
            coords,
            distance: (routeDistance / 1000).toFixed(2),
            duration: Math.round(routeDuration / 60),
          });
        }
      } catch (err) {
        console.warn("Route failed", err);
      }
    }

    setRoutes(newRoutes);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-gray-100 border-b flex items-center gap-4">
        <label>
          Time (min):
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(+e.target.value)}
            className="border px-2 py-1 w-20"
          />
        </label>
        <label>
          Pace (min/km):
          <input
            type="number"
            value={pace}
            onChange={(e) => setPace(+e.target.value)}
            className="border px-2 py-1 w-20"
          />
        </label>
        <button
          onClick={calculateRoutes}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Suggest Routes
        </button>
        {startPoint && (
          <span>
            Start: {startPoint[0].toFixed(4)}, {startPoint[1].toFixed(4)}
          </span>
        )}
      </div>

      <MapContainer center={[50.0755, 14.4378]} zoom={14} className="flex-1">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        {startPoint && (
          <Marker
            position={startPoint}
            icon={L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          />
        )}
        {routes.map((route, idx) => (
          <Polyline
            key={idx}
            positions={route.coords}
            color={`hsl(${(idx * 72) % 360}, 100%, 40%)`}
          />
        ))}
      </MapContainer>

      {loading && (
        <div className="absolute bottom-4 left-4 bg-white shadow p-2">
          Loading routes...
        </div>
      )}

      <div className="absolute top-4 right-4 bg-white shadow p-2 max-h-[60%] overflow-auto">
        <h2 className="font-bold mb-2">Routes</h2>
        {routes.length === 0 ? (
          <p>No routes yet.</p>
        ) : (
          <ul className="text-sm space-y-1">
            {routes.map((r, i) => (
              <li key={i}>
                Route {i + 1}: {r.distance} km, ~{r.duration} min
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
