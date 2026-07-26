'use client';

import Link from 'next/link';
import { Range } from '@/lib/types';
import { getOpenStatus } from '@/lib/utils';

interface RangeCardProps {
  range: Range;
}

const SAND    = '#D9C4A3';
const CHARCOAL = '#1A1A18';
const GREEN   = '#1B3A2B';
const TURF    = '#8FA680';
const CLAY    = '#B5551B';

export default function RangeCard({ range }: RangeCardProps) {
  const { isOpen, status } = getOpenStatus(range.workingHours);
  const isIndoor = range.category === 'indoor';

  const teeTags: string[] = [];
  if (!isIndoor) {
    if (range.grass === 'Yes' || range.grass === 'Both') teeTags.push('Grass Tees');
    if (range.grass === 'No' || range.grass === 'Both' || range.grass === 'Unknown' || range.grass === '') teeTags.push('Mats');
  }

  const features = [
    range.trackman === 'Yes' && 'TrackMan',
    range.toptracer === 'Yes' && 'TopTracer',
    range.foodBar === 'Yes' && 'Food & Bar',
    !isIndoor && range.lighting === 'Yes' && 'Night Lights',
    !isIndoor && range.roof === 'Yes' && 'Covered',
    ...teeTags,
  ].filter(Boolean) as string[];

  return (
    <div
      style={{ backgroundColor: SAND }}
      className="flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Status strip */}
      <div
        style={{ backgroundColor: isOpen ? GREEN : CHARCOAL }}
        className="flex items-center justify-between px-4 py-2.5"
      >
        <span
          style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', color: isOpen ? TURF : SAND }}
          className="text-xs font-bold uppercase tracking-widest"
        >
          {isOpen ? 'Open' : 'Closed'}
        </span>
        <span
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', color: SAND }}
          className="text-xs opacity-75"
        >
          {status}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-3 flex-1">

        {/* Name + city */}
        <div>
          <Link
            href={`/ranges/${range.slug}`}
            style={{ fontFamily: 'var(--font-fraunces, Fraunces, serif)', color: GREEN }}
            className="text-lg font-semibold leading-snug line-clamp-2 hover:opacity-75 transition-opacity"
          >
            {range.name}
          </Link>
          <p
            style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', color: CHARCOAL }}
            className="text-sm mt-0.5 opacity-55"
          >
            {range.city}, FL
          </p>
        </div>

        {/* Category + tech tags — square cornered, thin border */}
        <div className="flex flex-wrap gap-1.5">
          <span
            style={{
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              color: GREEN,
              borderColor: GREEN,
            }}
            className="text-xs font-medium px-2 py-0.5 border"
          >
            {isIndoor ? 'Indoor' : 'Outdoor'}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              color: CHARCOAL,
              borderColor: TURF,
            }}
            className="text-xs font-medium px-2 py-0.5 border"
          >
            {range.techLevel === 'high' ? 'High-Tech' : 'Traditional'}
          </span>
        </div>

        {/* Feature tags */}
        {features.length > 0 && (
          <div
            className="flex flex-wrap gap-1 mt-auto pt-3 border-t"
            style={{ borderColor: `${CHARCOAL}20` }}
          >
            {features.map((label) => (
              <span
                key={label}
                style={{
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  color: CHARCOAL,
                  borderColor: TURF,
                }}
                className="text-xs px-2 py-0.5 border opacity-70"
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/ranges/${range.slug}`}
          aria-label={`View details for ${range.name}`}
          style={{
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            backgroundColor: CLAY,
            color: SAND,
          }}
          className="mt-1 text-center text-sm font-semibold py-2 px-4 hover:opacity-90 transition-opacity"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
