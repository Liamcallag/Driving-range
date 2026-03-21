import Image from 'next/image';
import rangesData from '@/data/ranges.json';
import { Range } from '@/lib/types';
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
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay — darkens bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-40">
          <div className="inline-flex items-center gap-2 text-green-300 text-xs font-semibold uppercase tracking-widest mb-4">
            <span>⛳</span>
            <span>Florida Golf Directory</span>
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
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            {[
              { label: 'Total Ranges', value: total },
              { label: 'Outdoor', value: outdoorCount },
              { label: 'Indoor / Sim', value: indoorCount },
              { label: 'High-Tech', value: highTechCount },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 text-center"
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Directory ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <DirectoryClient ranges={ranges} />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-400">
          <p>Florida Driving Ranges Directory · {total} ranges listed statewide</p>
          <p className="mt-1">Data accurate as of 2026 · Hours subject to change</p>
        </div>
      </footer>
    </div>
  );
}
