import Image from 'next/image';
import Link from 'next/link';
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

      {/* ── Hero ── */}
      <header className="relative min-h-[540px] flex items-end overflow-hidden">
        {/* Background photo */}
        <Image
          src="/images/hero-range.jpg"
          alt="Golfer at a driving range"
          fill
          className="object-cover object-[35%_center]"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay — darkens bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-40">
          <div className="inline-flex items-center gap-2 text-green-300 text-xs font-semibold uppercase tracking-widest mb-4">
            <span aria-hidden="true">⛳</span>
            <span>Florida Golf Guide</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3">
            Florida Driving Ranges
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl">
            Find the perfect driving range across Florida — from high-tech simulators and
            TrackMan bays to scenic outdoor grass ranges. Browse all{' '}
            <span className="font-semibold text-white">{total} ranges</span> statewide.
          </p>

          {/* Stats bar */}
          <div className="mt-8 flex flex-wrap items-center gap-8 max-w-2xl">
            {[
              { label: 'Total Ranges', value: total },
              { label: 'Outdoor', value: outdoorCount },
              { label: 'Indoor / Sim', value: indoorCount },
              { label: 'High-Tech', value: highTechCount },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-8 bg-white/20" />}
                <div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/55 text-xs font-medium tracking-wide mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Directory ── */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <DirectoryClient ranges={ranges} />
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
