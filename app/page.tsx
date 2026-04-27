import Link from 'next/link';
import { Suspense } from 'react';
import rangesData from '@/data/ranges.json';
import { Range } from '@/lib/types';
import { CITY_PAGES } from '@/lib/cities';
import DirectoryClient from '@/components/DirectoryClient';

const ranges = rangesData as Range[];

export default function HomePage() {
  const total = ranges.length;
  const indoorCount = ranges.filter((r) => r.category === 'indoor').length;
  const outdoorCount = ranges.filter((r) => r.category === 'outdoor').length;
  const highTechCount = ranges.filter((r) => r.techLevel === 'high').length;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header banner ── */}
      <header className="bg-green-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Florida Driving Ranges
          </h1>
          <p className="text-green-200 text-base mb-6">
            Browse {total} driving ranges across Florida — outdoor, indoor, and high-tech.
          </p>
          <div className="flex items-center gap-8">
            {[
              { label: 'Total', value: total },
              { label: 'Outdoor', value: outdoorCount },
              { label: 'Indoor', value: indoorCount },
              { label: 'High-Tech', value: highTechCount },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-6 bg-green-700" />}
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-green-400 text-xs font-medium tracking-wide">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Directory ── */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Suspense>
          <DirectoryClient ranges={ranges} />
        </Suspense>
      </main>

      {/* ── Browse by City ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Browse by City</h2>
        <div className="flex flex-wrap gap-2">
          {CITY_PAGES.map((city) => {
            const count = (rangesData as Range[]).filter((r) => city.cities.includes(r.city)).length;
            return (
              <Link
                key={city.slug}
                href={`/cities/${city.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-green-400 hover:bg-green-50 hover:text-green-700 rounded-lg text-sm font-medium text-slate-700 transition-colors shadow-sm"
              >
                {city.name}
                <span className="text-xs text-slate-400 font-normal">{count}</span>
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
}
