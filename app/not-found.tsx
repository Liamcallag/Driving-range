
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl mb-4" aria-hidden="true">⛳</p>
      <h1 className="text-4xl font-bold text-slate-800 mb-2">Out of Bounds</h1>
      <p className="text-slate-500 text-lg mb-8 max-w-md">
        This page doesn't exist — looks like that shot went wide. Let's get you back on the fairway.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-xl transition-colors"
      >
        <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Directory
      </Link>
    </div>
  );
}
