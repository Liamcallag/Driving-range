'use client';

import Link from 'next/link';
import { Range } from '@/lib/types';
import { getOpenStatus } from '@/lib/utils';

interface RangeCardProps {
  range: Range;
}

export default function RangeCard({ range }: RangeCardProps) {
  const { isOpen, status } = getOpenStatus(range.workingHours);

  const isIndoor = range.category === 'indoor';

  // Tee surface tags: only relevant for outdoor ranges; skip if Unknown or empty
  const teeTags: { label: string; icon: string }[] = [];
  if (!isIndoor) {
    if (range.grass === 'Yes' || range.grass === 'Both') {
      teeTags.push({ label: 'Grass Tees', icon: '🌿' });
    }
    if (range.grass === 'No' || range.grass === 'Both') {
      teeTags.push({ label: 'Mats', icon: '🟫' });
    }
  }

  const features = [
    range.trackman === 'Yes' && { label: 'TrackMan', icon: '📡' },
    range.toptracer === 'Yes' && { label: 'TopTracer', icon: '🎯' },
    range.foodBar === 'Yes' && { label: 'Food & Bar', icon: '🍺' },
    // Lighting and roof/cover only shown for outdoor ranges (indoor already has these)
    !isIndoor && range.lighting === 'Yes' && { label: 'Night Lights', icon: '💡' },
    !isIndoor && range.roof === 'Yes' && { label: 'Covered', icon: '🏠' },
    ...teeTags,
  ].filter(Boolean) as { label: string; icon: string }[];

  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3">
      {/* Header */}
      <div>
        <Link
          href={`/ranges/${range.slug}`}
          className="text-base font-semibold text-slate-800 hover:text-green-700 transition-colors leading-snug line-clamp-2"
        >
          {range.name}
        </Link>
        <p className="text-sm text-slate-500 mt-0.5">{range.city}, FL</p>
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap gap-1.5 items-center">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            isIndoor ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {isIndoor ? 'Indoor' : 'Outdoor'}
        </span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            range.techLevel === 'high'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {range.techLevel === 'high' ? 'High-Tech' : 'Traditional'}
        </span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {isOpen ? 'Open' : 'Closed'}
        </span>
      </div>

      {/* Status */}
      <p className="text-xs text-slate-500">{status}</p>

      {/* Feature tags */}
      {features.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-slate-50">
          {features.map((f) => (
            <span
              key={f.label}
              className="text-xs bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100"
            >
              {f.icon} {f.label}
            </span>
          ))}
        </div>
      )}

      {/* View Details */}
      <Link
        href={`/ranges/${range.slug}`}
        className="mt-1 text-center text-sm font-medium text-green-700 hover:text-green-800 border border-green-200 hover:border-green-300 rounded-lg py-1.5 transition-colors"
      >
        View Details →
      </Link>
    </div>
  );
}
