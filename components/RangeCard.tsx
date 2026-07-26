'use client';

import Link from 'next/link';
import { Range } from '@/lib/types';
import { getOpenStatus } from '@/lib/utils';

export default function RangeCard({ range }: { range: Range }) {
  const { isOpen, status } = getOpenStatus(range.workingHours);
  const isIndoor = range.category === 'indoor';

  const typeTags = [
    isIndoor ? 'Indoor' : 'Outdoor',
    range.techLevel === 'high' ? 'High-Tech' : 'Traditional',
  ];

  const amenities = [
    range.trackman === 'Yes' && 'TrackMan',
    range.toptracer === 'Yes' && 'TopTracer',
    range.foodBar === 'Yes' && 'Food & Bar',
    !isIndoor && range.lighting === 'Yes' && 'Night Lights',
    !isIndoor && range.roof === 'Yes' && 'Covered',
    !isIndoor && (range.grass === 'Yes' || range.grass === 'Both') && 'Grass Tees',
    !isIndoor && (range.grass === 'No' || range.grass === 'Unknown' || range.grass === '') && 'Mats',
  ].filter(Boolean) as string[];

  return (
    <Link href={`/ranges/${range.slug}`} className="block group">
      <div className="bg-white border border-slate-100 rounded-lg overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all">

        {/* Image placeholder — swap for <Image> later */}
        <div className="h-36 bg-slate-50 flex items-center justify-center border-b border-slate-100">
          <svg className="w-6 h-6 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5M4.5 3h15A1.5 1.5 0 0121 4.5v15A1.5 1.5 0 0119.5 21H4.5A1.5 1.5 0 013 19.5v-15A1.5 1.5 0 014.5 3z" />
          </svg>
        </div>

        {/* Body */}
        <div className="px-4 pt-3 pb-4 flex flex-col gap-2">

          {/* Name + city */}
          <div>
            <p className="text-sm font-semibold text-slate-900 group-hover:text-green-700 transition-colors leading-snug line-clamp-2">
              {range.name}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{range.city}, FL</p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isOpen ? 'bg-emerald-400' : 'bg-slate-300'}`} />
            <span className="text-xs text-slate-500">{status}</span>
          </div>

          {/* Type tags — plain text, dot separated */}
          <div className="flex items-center gap-1 text-xs text-slate-400">
            {typeTags.map((tag, i) => (
              <span key={tag} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden="true">·</span>}
                {tag}
              </span>
            ))}
          </div>

          {/* Amenity tags — plain text, wrapping */}
          {amenities.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 text-xs text-slate-400">
              {amenities.map((a, i) => (
                <span key={a} className="flex items-center gap-1">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  {a}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>
    </Link>
  );
}
