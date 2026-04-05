'use client';

import { useRouter } from 'next/navigation';
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
  indoor:  createColoredIcon('#f97316'),  // orange-500
  outdoor: createColoredIcon('#16a34a'),  // green-700
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

  const rangesWithCoords = ranges.filter((r) => r.lat !== null && r.lng !== null);

  return (
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
  );
}
