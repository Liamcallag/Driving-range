'use client';

import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl mb-4">🏌️</p>
      <h1 className="text-4xl font-bold text-slate-800 mb-2">Something went wrong</h1>
      <p className="text-slate-500 text-lg mb-8 max-w-md">
        We hit an unexpected bunker. Try again or head back to the directory.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-xl transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-700 font-medium px-6 py-3 rounded-xl transition-colors bg-white"
        >
          Back to Directory
        </Link>
      </div>
    </div>
  );
}
