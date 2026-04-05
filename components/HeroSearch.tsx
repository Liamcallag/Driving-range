'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    const url = q ? `/?q=${encodeURIComponent(q)}#main-content` : '/#main-content';
    router.push(url);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex items-center gap-2 max-w-lg">
      <div className="relative flex-1">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50"
          aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by city or range name..."
          aria-label="Search driving ranges"
          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition text-sm"
        />
      </div>
      <button
        type="submit"
        className="px-5 py-3.5 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-xl transition text-sm whitespace-nowrap shadow"
      >
        Search
      </button>
    </form>
  );
}
