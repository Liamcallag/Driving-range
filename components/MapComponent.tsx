'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Range } from '@/lib/types';

// Fix default Leaflet icon issue with webpack/Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function createColoredIcon(color: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24C24 5.373 18.627 0 12 0z" fill="${color}" stroke="white" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="4" fill="white" opacity="0.9"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
    className: '',
  });
}

const icons = {
  indoor:  createColoredIcon('#f97316'),
  outdoor: createColoredIcon('#16a34a'),
};

function getIcon(range: Range) {
  return range.category === 'indoor' ? icons.indoor : icons.outdoor;
}

interface MapComponentProps {
  ranges: Range[];
  onRangeClick?: (slug: string) => void;
}

export default function MapComponent({ ranges, onRangeClick }: MapComponentProps) {
  const router = useRouter();
  const [activated, setActivated] = useState(false);

  const rangesWithCoords = ranges.filter((r) => r.lat !== null && r.lng !== null);

  return (
    <div className="relative h-full w-full">
      {/* Tap-to-activate overlay — mobile only, dismissed on first tap */}
      {!activated && (
        <div
          className="absolute inset-0 z-[1000] flex flex-col items-center justify-center gap-2 bg-black/30 md:hidden cursor-pointer"
          onClick={() => setActivated(true)}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
          </svg>
          <span className="text-white text-sm font-medium drop-shadow">Tap to interact with map</span>
        </div>
      )}
    <MapContainer
      center={[27.8, -81.7]}
      zoom={7}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {rangesWithCoords.map((range) => (
        <Marker
          key={range.slug}
          position={[range.lat as number, range.lng as number]}
          icon={getIcon(range)}
        >
          <Popup>
            <div className="min-w-[180px]">
              <p className="font-semibold text-sm leading-tight mb-1">{range.name}</p>
              <p className="text-xs text-gray-500 mb-2">{range.city}, FL</p>
              <div className="flex gap-1 mb-2 flex-wrap">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                    range.category === 'indoor'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {range.category === 'indoor' ? 'Indoor' : 'Outdoor'}
                </span>
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                    range.techLevel === 'high'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {range.techLevel === 'high' ? 'High-Tech' : 'Traditional'}
                </span>
              </div>
              <button
                onClick={() => {
                  if (onRangeClick) onRangeClick(range.slug);
                  router.push(`/ranges/${range.slug}`);
                }}
                className="block w-full text-center text-xs bg-green-700 text-white px-3 py-1.5 rounded hover:bg-green-800 transition-colors"
              >
                View Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
}
