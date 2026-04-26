'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    const qs = q ? `?q=${encodeURIComponent(q)}` : '';
    router.push(`/${qs}#main-content`);
  }

  return (
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
      />
    </form>
  );
}
