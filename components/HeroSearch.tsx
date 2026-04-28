'use client';

import Image from 'next/image';

interface Props {
  total: number;
  outdoorCount: number;
  indoorCount: number;
  highTechCount: number;
}

export default function HeroSearch({ total, outdoorCount, indoorCount, highTechCount }: Props) {
  function handleClick() {
    document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-range.jpg"
        alt="Golfer at a driving range"
        fill
        className="object-cover object-[35%_center]"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 text-balance">
          Find your perfect driving range
        </h1>
        <p className="text-white/80 text-lg mb-10">
          Browse {total} driving ranges across Florida — outdoor, indoor, and high-tech.
        </p>
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition-colors"
        >
          Find a range
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="mt-12 flex items-center justify-center gap-8 absolute bottom-10 left-1/2 -translate-x-1/2">
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
    </header>
  );
}
