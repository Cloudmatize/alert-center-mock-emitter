import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Location, WazeAccidentPayload } from '@/types/alert.types';

interface AlertMapProps {
  location?: Location;
  accident?: WazeAccidentPayload;
  darkMode?: boolean;
}

function MapCenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([lat, lng], 15);
  }, [lat, lng, map]);
  
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

const createAccidentIcon = (subtype: string) => {
  const isHeavy = subtype === 'ACCIDENT_MAJOR';
  const bgColor = isHeavy ? 'bg-red-600' : 'bg-orange-500';
  const animationColor = isHeavy ? 'bg-red-500' : 'bg-orange-400';
  
  return new DivIcon({
    className: 'custom-marker',
    html: `
      <div class="relative">
        <div class="absolute inset-0 ${animationColor} rounded-full animate-ping opacity-75" style="width: 32px; height: 32px;"></div>
        <div class="${bgColor} rounded-full border-2 border-white shadow-lg flex items-center justify-center" style="width: 32px; height: 32px; position: relative; z-index: 10;">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export function AlertMap({ location, accident, darkMode = false }: AlertMapProps) {
  const getAccidentCoords = (geo: string): [number, number] => {
    const match = geo.match(/POINT\(([-\d.]+)\s+([-\d.]+)\)/);
    if (match) {
      return [parseFloat(match[2]), parseFloat(match[1])];
    }
    return [-23.6227, -46.5547]; // fallback
  };

  const position: [number, number] = accident 
    ? getAccidentCoords(accident.geo)
    : location 
      ? [location.latitude, location.longitude]
      : [-23.6227, -46.5547];

  const icon = accident ? createAccidentIcon(accident.subtype) : createPulsingIcon();

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
        <Marker position={position} icon={icon}>
          <Popup
            className="custom-white-popup"
            closeButton={false}
          >
            {accident ? (
              <div className="p-2">
                <p className="font-semibold mb-1 text-base text-gray-900">
                  {accident.subtype === 'ACCIDENT_MAJOR' ? '🚨 Acidente Grave' : '⚠️ Acidente Leve'}
                </p>
                <p className="text-sm text-gray-700 font-medium">{accident.street}</p>
                <p className="text-sm text-gray-600">{accident.city}</p>
                <p className="text-xs mt-2 text-gray-600">{accident.reportDescription}</p>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Confiança: {accident.confidence}/10</p>
                  <p className="text-xs text-gray-500">Confiabilidade: {accident.reliability}/10</p>
                  <p className="text-xs text-gray-500">👍 {accident.nThumbsUp}</p>
                </div>
                <p className="text-xs mt-1 text-gray-400">
                  📍 {position[0].toFixed(4)}, {position[1].toFixed(4)}
                </p>
              </div>
            ) : location ? (
              <div className="p-2">
                <p className="font-semibold mb-1 text-base text-gray-900">{location.address}</p>
                <p className="text-sm text-gray-600">
                  {location.city}, {location.state}
                </p>
                <p className="text-xs mt-2 text-gray-500">
                  📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </p>
              </div>
            ) : null}
          </Popup>
        </Marker>
        <MapCenter lat={position[0]} lng={position[1]} />
      </MapContainer>
    </div>
  );
}
