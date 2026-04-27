'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface Props {
  total: number;
  outdoorCount: number;
  indoorCount: number;
  highTechCount: number;
  onSearch: (q: string) => void;
}

export default function HeroSearch({ total, outdoorCount, indoorCount, highTechCount, onSearch }: Props) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  // Collapse if URL already has a query (e.g. back navigation)
  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    if (q) { setQuery(q); setCollapsed(true); }
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    setCollapsed(!!q);
    onSearch(q);
    if (q) {
      setTimeout(() => {
        document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }

  function handleClear() {
    setQuery('');
    setCollapsed(false);
    onSearch('');
  }

  return (
    <header
      className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
        collapsed ? 'h-20' : 'h-[70vh] min-h-[480px]'
      } flex items-center justify-center`}
    >
      {/* Background photo */}
      <Image
        src="/images/hero-range.jpg"
        alt="Golfer at a driving range"
        fill
        className="object-cover object-[35%_center]"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Full hero content */}
      {!collapsed && (
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 text-balance">
            Find your perfect driving range
          </h1>
          <p className="text-white/80 text-lg mb-8">
            Browse {total} driving ranges across Florida — outdoor, indoor, and high-tech.
          </p>
          <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full px-5 py-4 shadow-lg max-w-xl mx-auto">
            <svg className="w-5 h-5 text-slate-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or city..."
              aria-label="Search driving ranges"
              className="text-slate-700 text-base w-full outline-none placeholder-slate-400 bg-transparent"
              autoFocus
            />
            {query && (
              <button type="submit" className="ml-3 shrink-0 bg-green-700 text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-green-800 transition-colors">
                Search
              </button>
            )}
          </form>
          <div className="mt-8 flex items-center justify-center gap-8">
            {[
              { label: 'Total', value: total },
              { label: 'Outdoor', value: outdoorCount },
              { label: 'Indoor', value: indoorCount },
              { label: 'High-Tech', value: highTechCount },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-8 bg-white/20" />}
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/60 text-xs font-medium tracking-wide">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collapsed bar */}
      {collapsed && (
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full px-5 py-3 shadow-lg">
            <svg className="w-4 h-4 text-slate-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or city..."
              aria-label="Search driving ranges"
              className="text-slate-700 text-sm w-full outline-none placeholder-slate-400 bg-transparent"
            />
            <button type="button" onClick={handleClear} className="ml-3 shrink-0 text-slate-400 hover:text-slate-600 text-sm transition-colors">
              Clear
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
