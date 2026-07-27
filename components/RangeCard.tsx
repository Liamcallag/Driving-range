'use client';

import Link from 'next/link';
import { Range } from '@/lib/types';
import { getOpenStatus } from '@/lib/utils';

const COLOR = {
  openText:   '#2E7D32',
  closedText: '#C62828',
  typeTag:    '#5A6B7A',
  techTag:    '#1B3A2B', // same green as high-tech
  amenityTag: '#5A6B7A',
};

export default function RangeCard({ range }: { range: Range }) {
  const { isOpen, status } = getOpenStatus(range.workingHours);
  const isIndoor = range.category === 'indoor';

  const typeTags = [
    isIndoor ? 'Indoor' : 'Outdoor',
    range.techLevel === 'high' ? 'High-Tech' : 'Traditional',
  ];

  const techTags = [
    range.trackman === 'Yes' && 'TrackMan',
    range.toptracer === 'Yes' && 'TopTracer',
  ].filter(Boolean) as string[];

  const amenityTags = [
    range.foodBar === 'Yes' && 'Food & Bar',
    !isIndoor && range.lighting === 'Yes' && 'Night Lights',
    !isIndoor && range.roof === 'Yes' && 'Covered',
    !isIndoor && (range.grass === 'Yes' || range.grass === 'Both') && 'Grass Tees',
    !isIndoor && (range.grass === 'No' || range.grass === 'Unknown' || range.grass === '') && 'Mats',
  ].filter(Boolean) as string[];

  // Combine for a single tag row, carrying color per item
  const allAmenities: { label: string; color: string }[] = [
    ...techTags.map((l) => ({ label: l, color: COLOR.techTag })),
    ...amenityTags.map((l) => ({ label: l, color: COLOR.amenityTag })),
  ];

  return (
    <Link href={`/ranges/${range.slug}`} className="block group h-full">
      <div
        className="bg-white rounded-lg overflow-hidden hover:shadow-sm transition-all h-full"
        style={{ border: `1.5px solid ${isIndoor ? '#f97316' : '#16a34a'}` }}
      >

        <div className="px-4 pt-3 pb-4 flex flex-col gap-2">

          {/* Name + city */}
          <div>
            <p className="text-sm font-semibold text-slate-900 group-hover:text-green-700 transition-colors leading-snug line-clamp-2">
              {range.name}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{range.city}, FL</p>
          </div>

          {/* Status — colored dot + colored text */}
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: isOpen ? COLOR.openText : COLOR.closedText }}
            />
            <span className="text-xs" style={{ color: isOpen ? COLOR.openText : COLOR.closedText }}>
              {status}
            </span>
          </div>

          {/* Type tags — muted blue-gray, dot separated */}
          <div className="flex items-center gap-1 text-xs" style={{ color: COLOR.typeTag }}>
            {typeTags.map((tag, i) => (
              <span key={tag} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden="true">·</span>}
                {tag}
              </span>
            ))}
          </div>

          {/* Amenity + tech tags — each colored by group, single row */}
          {allAmenities.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 text-xs">
              {allAmenities.map((a, i) => (
                <span key={a.label} className="flex items-center gap-1" style={{ color: a.color }}>
                  {i > 0 && <span className="text-slate-200" aria-hidden="true">·</span>}
                  {a.label}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>
    </Link>
  );
}
