import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Location } from '@/types/alert.types';

interface AlertMapProps {
  location: Location;
  darkMode?: boolean;
}

function MapCenter({ location }: { location: Location }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([location.latitude, location.longitude], 15);
  }, [location, map]);
  
  return null;
}

const createPulsingIcon = () => {
  return new DivIcon({
    className: 'custom-marker',
    html: `
      <div class="relative">
        <div class="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75" style="width: 24px; height: 24px;"></div>
        <div class="bg-blue-600 rounded-full border-2 border-white shadow-lg" style="width: 24px; height: 24px; position: relative; z-index: 10;">
          <svg class="w-full h-full text-white p-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

export function AlertMap({ location, darkMode = false }: AlertMapProps) {
  const position: [number, number] = [location.latitude, location.longitude];

  return (
    <div className={`rounded-xl overflow-hidden shadow-2xl border ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <MapContainer
        center={position}
        zoom={16}
        style={{ height: '450px', width: '100%' }}
        scrollWheelZoom={false}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url={darkMode 
            ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            : 'https://worldtiles4.waze.com/tiles/{z}/{x}/{y}.png?highres=true'
          }
          maxZoom={20}
        />
        <Marker position={position} icon={createPulsingIcon()}>
          <Popup
            className="custom-white-popup"
            closeButton={false}
          >
            <div className="p-2">
              <p className="font-semibold mb-1 text-base text-gray-900">{location.address}</p>
              <p className="text-sm text-gray-600">
                {location.city}, {location.state}
              </p>
              <p className="text-xs mt-2 text-gray-500">
                📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
        <MapCenter location={location} />
      </MapContainer>
    </div>
  );
}
