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
    <div className="h-full bg-slate-50 animate-pulse flex items-center justify-center text-slate-400 text-sm">
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
  category: 'all', techLevel: 'all', openNow: false, city: '',
  foodBar: false, grassTees: false, mats: false,
  lighting: false, roofCover: false, trackman: false, toptracer: false,
};

interface DirectoryClientProps {
  ranges: Range[];
  heroQuery?: string;
}

const GREEN = '#1B3A2B';
const GREEN_LIGHT = '#eef4f0';

function FilterLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: GREEN }}>
      {children}
    </span>
  );
}

const ACTIVE_COLORS: Record<string, string> = {
  all:        GREEN,
  outdoor:    '#16a34a', // map green
  indoor:     '#f97316', // map orange
  high:       GREEN,
  low:        GREEN,
};

function SegmentGroup<T extends string>({
  options, value, onChange, groupLabel,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  groupLabel?: string;
}) {
  return (
    <div role="group" aria-label={groupLabel} className="flex overflow-hidden border border-slate-200">
      {options.map((opt, i) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={`px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap
            ${i > 0 ? 'border-l border-slate-200' : ''}
            ${value === opt.value ? 'text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          style={value === opt.value ? { backgroundColor: ACTIVE_COLORS[opt.value] ?? GREEN } : undefined}
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

  useEffect(() => { setSearchQuery(heroQuery); }, [heroQuery]);

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

  useEffect(() => { syncToUrl(searchQuery, filters); }, [searchQuery, filters, syncToUrl]);

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

  const amenities: { key: keyof Filters; label: string; isTech?: boolean }[] = [
    { key: 'foodBar',   label: 'Food & Bar' },
    { key: 'grassTees', label: 'Grass Tees' },
    { key: 'trackman',  label: 'TrackMan',  isTech: true },
    { key: 'toptracer', label: 'TopTracer', isTech: true },
    { key: 'mats',      label: 'Mats' },
    { key: 'lighting',  label: 'Night Lights' },
    { key: 'roofCover', label: 'Roof / Cover' },
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

        {/* Right: search + filters */}
        <div className="order-1 lg:order-2 flex flex-col gap-3">

          {/* Search */}
          <div className="relative">
            <label htmlFor="range-search" className="sr-only">Search driving ranges by name or city</label>
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" style={{ color: GREEN }}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              id="range-search"
              type="text"
              placeholder="Search by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none text-sm"
              style={{ borderColor: searchQuery ? GREEN : undefined }}
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

          {/* Filter panel */}
          <div>
            {/* Mobile toggle */}
            <button
              className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200"
              onClick={() => setFiltersOpen((o) => !o)}
              aria-expanded={filtersOpen}
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                Filters
                {activeChips.length > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white" style={{ backgroundColor: GREEN, borderRadius: '50%' }}>
                    {activeChips.length}
                  </span>
                )}
              </span>
              <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Filter content */}
            <div className={`bg-white border border-slate-200 p-4 mt-2 lg:mt-0 lg:block ${filtersOpen ? 'block' : 'hidden'}`}>

              <div className="flex flex-wrap gap-x-5 gap-y-4 items-end">
                <div>
                  <FilterLabel>Type</FilterLabel>
                  <SegmentGroup
                    groupLabel="Filter by type"
                    options={[
                      { value: 'all',     label: 'All' },
                      { value: 'outdoor', label: 'Outdoor' },
                      { value: 'indoor',  label: 'Indoor' },
                    ]}
                    value={filters.category}
                    onChange={(v) => toggle('category', v)}
                  />
                </div>

                <div>
                  <FilterLabel>Technology</FilterLabel>
                  <SegmentGroup
                    groupLabel="Filter by technology"
                    options={[
                      { value: 'all',  label: 'All' },
                      { value: 'high', label: 'High-Tech' },
                      { value: 'low',  label: 'Traditional' },
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
                    className="h-[34px] pl-3 pr-8 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none appearance-none"
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
                    className="h-[34px] flex items-center gap-2 px-3 text-sm font-medium border transition-colors"
                    style={filters.openNow
                      ? { backgroundColor: GREEN, color: 'white', borderColor: GREEN }
                      : { backgroundColor: 'white', color: '#475569', borderColor: '#e2e8f0' }
                    }
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: filters.openNow ? '#86efac' : '#cbd5e1' }} />
                    Open Now
                  </button>
                </div>

                {hasActiveFilters && (
                  <div className="ml-auto self-end">
                    <button
                      onClick={() => { setSearchQuery(''); setFilters(EMPTY_FILTERS); }}
                      className="h-[34px] flex items-center gap-1.5 px-3 text-xs text-slate-400 hover:text-slate-600 border border-slate-200 hover:border-slate-300 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 my-4" />

              {/* Amenities */}
              <div>
                <FilterLabel>
                  Amenities{activeAmenityCount > 0 && ` (${activeAmenityCount})`}
                </FilterLabel>
                <div className="flex flex-col gap-2">
                  {/* Row 1: yellow amenities */}
                  <div className="flex flex-wrap gap-2">
                    {amenities.filter(({ isTech }) => !isTech).map(({ key, label }) => {
                      const active = !!filters[key];
                      return (
                        <button
                          key={key}
                          onClick={() => toggleBool(key)}
                          aria-pressed={active}
                          className="px-2.5 py-1 text-xs font-bold border transition-colors"
                          style={active
                            ? { backgroundColor: GREEN, color: 'white', borderColor: GREEN }
                            : { backgroundColor: '#fdf4e7', color: '#7a5a2a', borderColor: '#e8d5a0' }
                          }
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                  {/* Row 2: tech (green) */}
                  <div className="flex flex-wrap gap-2">
                    {amenities.filter(({ isTech }) => isTech).map(({ key, label }) => {
                      const active = !!filters[key];
                      return (
                        <button
                          key={key}
                          onClick={() => toggleBool(key)}
                          aria-pressed={active}
                          className="px-2.5 py-1 text-xs font-bold border transition-colors"
                          style={active
                            ? { backgroundColor: GREEN, color: 'white', borderColor: GREEN }
                            : { backgroundColor: GREEN_LIGHT, color: GREEN, borderColor: '#d0e4d8' }
                          }
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* Map */}
        <div className="order-2 lg:order-1 overflow-hidden border border-slate-200 h-[260px] lg:h-[480px]">
          <MapComponent ranges={sorted} />
        </div>

      </div>

      {/* Results bar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500" aria-live="polite" aria-atomic="true">
          Showing <span className="font-semibold text-slate-800">{filtered.length}</span>
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
            className="h-[34px] pl-2 pr-7 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
          >
            <option value="default">Default</option>
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="city">City</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3" aria-hidden="true">⛳</p>
          <p className="text-lg font-semibold text-slate-600">No ranges match your filters</p>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search or clearing some filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {sorted.map((range) => (
            <RangeCard key={range.slug} range={range} />
          ))}
        </div>
      )}
    </div>
  );
}
