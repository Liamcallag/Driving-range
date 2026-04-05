'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Range } from '@/lib/types';
import { getCities, getOpenStatus } from '@/lib/utils';
import RangeCard from './RangeCard';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-slate-400 text-sm">
      Loading map...
    </div>
  ),
});

interface Filters {
  category: 'all' | 'indoor' | 'outdoor';
  techLevel: 'all' | 'high' | 'low';
  openNow: boolean;
  city: string;
  foodBar: boolean;
  grassTees: boolean;
  mats: boolean;
  lighting: boolean;
  roofCover: boolean;
  trackman: boolean;
  toptracer: boolean;
}

const EMPTY_FILTERS: Filters = {
  category: 'all',
  techLevel: 'all',
  openNow: false,
  city: '',
  foodBar: false,
  grassTees: false,
  mats: false,
  lighting: false,
  roofCover: false,
  trackman: false,
  toptracer: false,
};

interface DirectoryClientProps {
  ranges: Range[];
  initialSearch?: string;
}

function FilterLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5 block">
      {children}
    </span>
  );
}

function SegmentGroup<T extends string>({
  options,
  value,
  onChange,
  activeColors,
  groupLabel,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  activeColors?: Partial<Record<T, string>>;
  groupLabel?: string;
}) {
  const defaultActive = 'bg-green-700 text-white border-green-700';
  return (
    <div role="group" aria-label={groupLabel} className="flex rounded-lg overflow-hidden border border-slate-200">
      {options.map((opt, i) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={`px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap
            ${i > 0 ? 'border-l border-slate-200' : ''}
            ${value === opt.value
              ? (activeColors?.[opt.value] ?? defaultActive)
              : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function DirectoryClient({ ranges, initialSearch = '' }: DirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [showMap, setShowMap] = useState(true);
  const [sort, setSort] = useState<'default' | 'name-asc' | 'name-desc' | 'city'>('default');

  const cities = useMemo(() => getCities(ranges), [ranges]);

  const filtered = useMemo(() => {
    return ranges.filter((r) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!r.name.toLowerCase().includes(q) && !r.city.toLowerCase().includes(q)) return false;
      }
      if (filters.category !== 'all' && r.category !== filters.category) return false;
      if (filters.techLevel !== 'all' && r.techLevel !== filters.techLevel) return false;
      if (filters.city && r.city !== filters.city) return false;
      if (filters.openNow && !getOpenStatus(r.workingHours).isOpen) return false;
      if (filters.foodBar && r.foodBar !== 'Yes') return false;
      if (filters.grassTees && r.grass !== 'Yes' && r.grass !== 'Both') return false;
      if (filters.mats && r.grass !== 'No' && r.grass !== 'Both') return false;
      if (filters.lighting && r.lighting !== 'Yes') return false;
      if (filters.roofCover && r.roof !== 'Yes') return false;
      if (filters.trackman && r.trackman !== 'Yes') return false;
      if (filters.toptracer && r.toptracer !== 'Yes') return false;
      return true;
    });
  }, [ranges, searchQuery, filters]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    if (sort === 'name-asc') copy.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'name-desc') copy.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === 'city') copy.sort((a, b) => a.city.localeCompare(b.city));
    return copy;
  }, [filtered, sort]);

  function toggle<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function toggleBool(key: keyof Filters) {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const activeAmenityCount = [
    filters.foodBar, filters.grassTees, filters.mats,
    filters.lighting, filters.roofCover, filters.trackman, filters.toptracer,
  ].filter(Boolean).length;

  const hasActiveFilters =
    searchQuery || filters.category !== 'all' || filters.techLevel !== 'all' ||
    filters.openNow || filters.city || activeAmenityCount > 0;

  const amenities: { key: keyof Filters; label: string; icon: string }[] = [
    { key: 'foodBar', label: 'Food & Bar', icon: '🍺' },
    { key: 'grassTees', label: 'Grass Tees', icon: '🌿' },
    { key: 'mats', label: 'Mats', icon: '🟫' },
    { key: 'lighting', label: 'Night Lights', icon: '💡' },
    { key: 'roofCover', label: 'Roof / Cover', icon: '🏠' },
    { key: 'trackman', label: 'TrackMan', icon: '📡' },
    { key: 'toptracer', label: 'TopTracer', icon: '🎯' },
  ];

  const activeChips: { label: string; onRemove: () => void }[] = [
    ...(searchQuery ? [{ label: `"${searchQuery}"`, onRemove: () => setSearchQuery('') }] : []),
    ...(filters.category !== 'all' ? [{ label: filters.category === 'indoor' ? 'Indoor' : 'Outdoor', onRemove: () => toggle('category', 'all') }] : []),
    ...(filters.techLevel !== 'all' ? [{ label: filters.techLevel === 'high' ? 'High-Tech' : 'Traditional', onRemove: () => toggle('techLevel', 'all') }] : []),
    ...(filters.city ? [{ label: filters.city, onRemove: () => toggle('city', '') }] : []),
    ...(filters.openNow ? [{ label: 'Open Now', onRemove: () => toggle('openNow', false) }] : []),
    ...amenities.filter(({ key }) => !!filters[key]).map(({ key, label }) => ({ label, onRemove: () => toggle(key, false) })),
  ];

  return (
    <div className="w-full">

      {/* ── Filter Panel ── */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-4">

        {/* Row 1: primary filters */}
        <div className="flex flex-wrap gap-x-5 gap-y-3 items-end">

          <div>
            <FilterLabel>Type</FilterLabel>
            <SegmentGroup
              groupLabel="Filter by type"
              options={[
                { value: 'all', label: 'All' },
                { value: 'outdoor', label: 'Outdoor' },
                { value: 'indoor', label: 'Indoor' },
              ]}
              value={filters.category}
              onChange={(v) => toggle('category', v)}
              activeColors={{
                all: 'bg-blue-600 text-white border-blue-600',
                outdoor: 'bg-green-700 text-white border-green-700',
                indoor: 'bg-orange-500 text-white border-orange-500',
              }}
            />
          </div>

          <div>
            <FilterLabel>Technology <span className="normal-case tracking-normal font-normal text-slate-300">— TrackMan, TopTracer or simulators</span></FilterLabel>
            <SegmentGroup
              groupLabel="Filter by technology level"
              options={[
                { value: 'all', label: 'All' },
                { value: 'high', label: 'High-Tech' },
                { value: 'low', label: 'Traditional' },
              ]}
              value={filters.techLevel}
              onChange={(v) => toggle('techLevel', v)}
            />
          </div>

          <div>
            <FilterLabel>City</FilterLabel>
            <select
              aria-label="Filter by city"
              value={filters.city}
              onChange={(e) => toggle('city', e.target.value)}
              className="h-[34px] pl-3 pr-8 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <FilterLabel>Availability</FilterLabel>
            <button
              onClick={() => toggleBool('openNow')}
              aria-pressed={filters.openNow}
              className={`h-[34px] flex items-center gap-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                filters.openNow
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span aria-hidden="true" className={`w-2 h-2 rounded-full ${filters.openNow ? 'bg-emerald-200' : 'bg-slate-300'}`} />
              Open Now
            </button>
          </div>

          {hasActiveFilters && (
            <div className="ml-auto self-end">
              <button
                onClick={() => { setSearchQuery(''); setFilters(EMPTY_FILTERS); }}
                className="h-[34px] flex items-center gap-1.5 px-3 text-sm text-slate-400 hover:text-slate-600 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors"
              >
                <svg className="w-3.5 h-3.5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 my-3.5" />

        {/* Row 2: amenities */}
        <div>
          <FilterLabel>
            Amenities
            {activeAmenityCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-green-700 text-white rounded-full normal-case tracking-normal">
                {activeAmenityCount}
              </span>
            )}
          </FilterLabel>
          <div className="flex flex-wrap gap-2">
            {amenities.map(({ key, label, icon }) => {
              const active = !!filters[key];
              return (
                <button
                  key={key}
                  onClick={() => toggleBool(key)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                    active
                      ? 'bg-green-700 text-white border-green-700'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span className="text-sm leading-none" aria-hidden="true">{icon}</span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Active filter chips ── */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3" aria-label="Active filters">
          {activeChips.map((chip) => (
            <span key={chip.label} className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-200 text-green-800 text-xs font-medium rounded-full">
              {chip.label}
              <button onClick={chip.onRemove} aria-label={`Remove filter: ${chip.label}`} className="ml-0.5 hover:text-green-600">
                <svg className="w-3 h-3" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* ── Results bar ── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500" aria-live="polite" aria-atomic="true">
          Showing{' '}
          <span className="font-semibold text-slate-800">{filtered.length}</span>
          {filtered.length !== ranges.length && (
            <> of <span className="font-semibold text-slate-800">{ranges.length}</span></>
          )}{' '}
          driving range{filtered.length !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-slate-400 whitespace-nowrap">Sort by</label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="h-[34px] pl-2 pr-7 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
          >
            <option value="default">Default</option>
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="city">City</option>
          </select>
          <button
            onClick={() => setShowMap((v) => !v)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              showMap
                ? 'bg-green-700 text-white border-green-700'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
          <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13 6-3m-6 3V7m6 10 4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>
      </div>

      {/* ── Map ── */}
      {showMap && (
        <div className="mb-6 rounded-xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: '480px' }}>
          <MapComponent ranges={sorted} />
        </div>
      )}

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3" aria-hidden="true">⛳</p>
          <p className="text-lg font-semibold text-slate-600">No ranges match your filters</p>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search or clearing some filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((range) => (
            <RangeCard key={range.slug} range={range} />
          ))}
        </div>
      )}
    </div>
  );
}
