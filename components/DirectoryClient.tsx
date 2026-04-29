'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
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
  heroQuery?: string;
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

export default function DirectoryClient({ ranges, heroQuery = '' }: DirectoryClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(() => heroQuery || (searchParams.get('q') ?? ''));
  const [filters, setFilters] = useState<Filters>(() => ({
    ...EMPTY_FILTERS,
    category: (searchParams.get('type') as Filters['category']) ?? 'all',
    techLevel: (searchParams.get('tech') as Filters['techLevel']) ?? 'all',
    city: searchParams.get('city') ?? '',
    openNow: searchParams.get('open') === '1',
    foodBar: searchParams.get('foodBar') === '1',
    grassTees: searchParams.get('grassTees') === '1',
    mats: searchParams.get('mats') === '1',
    lighting: searchParams.get('lighting') === '1',
    roofCover: searchParams.get('roofCover') === '1',
    trackman: searchParams.get('trackman') === '1',
    toptracer: searchParams.get('toptracer') === '1',
  }));
  const [sort, setSort] = useState<'default' | 'name-asc' | 'name-desc' | 'city'>('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSearchQuery(heroQuery);
  }, [heroQuery]);

  // Sync filters to URL so back button restores state
  const syncToUrl = useCallback((query: string, f: Filters) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (f.category !== 'all') params.set('type', f.category);
    if (f.techLevel !== 'all') params.set('tech', f.techLevel);
    if (f.city) params.set('city', f.city);
    if (f.openNow) params.set('open', '1');
    if (f.foodBar) params.set('foodBar', '1');
    if (f.grassTees) params.set('grassTees', '1');
    if (f.mats) params.set('mats', '1');
    if (f.lighting) params.set('lighting', '1');
    if (f.roofCover) params.set('roofCover', '1');
    if (f.trackman) params.set('trackman', '1');
    if (f.toptracer) params.set('toptracer', '1');
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  }, [router, pathname]);

  useEffect(() => {
    syncToUrl(searchQuery, filters);
  }, [searchQuery, filters, syncToUrl]);

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

      {/* ── Hero: map left, filters right ── */}
      <div className="flex flex-col gap-4 mb-6 lg:grid lg:grid-cols-2 lg:items-start">

        {/* Right column: search + filters grouped together */}
        <div className="order-1 lg:order-2 flex flex-col gap-3">

        {/* Search */}
        <div className="relative">
          <label htmlFor="range-search" className="sr-only">Search driving ranges by name or city</label>
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            id="range-search"
            type="text"
            placeholder="Search by name or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-4 border-2 border-green-500 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-600 shadow-sm text-base"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Panel */}
        <div>

          {/* Mobile toggle button */}
          <button
            className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm"
            onClick={() => setFiltersOpen((o) => !o)}
            aria-expanded={filtersOpen}
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h2M9 16h6" />
              </svg>
              Filters
              {(hasActiveFilters ? activeChips.length : 0) > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold bg-green-700 text-white rounded-full">
                  {activeChips.length}
                </span>
              )}
            </span>
            <svg
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {/* Filter content */}
          <div className={`bg-white border border-slate-200 rounded-xl shadow-sm p-4 mt-2 lg:mt-0 lg:block ${filtersOpen ? 'block' : 'hidden'}`}>

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
                    all:     'bg-green-700 text-white border-green-700',
                    outdoor: 'bg-green-100 text-green-800 border-green-300',
                    indoor:  'bg-orange-100 text-orange-800 border-orange-300',
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
                  activeColors={{
                    all:  'bg-green-700 text-white border-green-700',
                    high: 'bg-purple-100 text-purple-800 border-purple-300',
                    low:  'bg-amber-100 text-amber-800 border-amber-300',
                  }}
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

            <div className="border-t border-slate-100 my-3.5" />

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

          {/* Active chips */}
          {activeChips.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3" aria-label="Active filters">
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

          </div>{/* end filter content */}
        </div>{/* end filter panel */}
        </div>{/* end right column */}

        {/* Map — left column on desktop, below filters on mobile */}
        <div className="order-2 lg:order-1 rounded-xl overflow-hidden border border-slate-200 shadow-sm h-[260px] lg:h-[480px]">
          <MapComponent ranges={sorted} />
        </div>

      </div>

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
        </div>
      </div>

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
