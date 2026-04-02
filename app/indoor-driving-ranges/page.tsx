import Link from 'next/link';
import { Metadata } from 'next';
import rangesData from '@/data/ranges.json';
import { Range } from '@/lib/types';
import { SITE_URL } from '@/lib/config';
import RangeCard from '@/components/RangeCard';

const ranges = rangesData as Range[];
const indoorRanges = ranges.filter((r) => r.category === 'indoor');

export const metadata: Metadata = {
  title: 'Indoor Driving Ranges in Florida (2026) | Florida Driving Ranges',
  description: `Find indoor driving ranges and golf simulator facilities across Florida. Browse ${indoorRanges.length} indoor ranges with hours, amenities, and directions.`,
  openGraph: {
    title: 'Indoor Driving Ranges in Florida (2026)',
    description: `Find indoor driving ranges and golf simulator facilities across Florida. Browse ${indoorRanges.length} indoor ranges statewide.`,
    url: `${SITE_URL}/indoor-driving-ranges`,
    siteName: 'Florida Driving Ranges',
    type: 'website',
  },
};

export default function IndoorDrivingRangesPage() {
  const highTechCount = indoorRanges.filter((r) => r.techLevel === 'high').length;

  // Group by city for the summary
  const cities = [...new Set(indoorRanges.map((r) => r.city))].sort();

  return (
    <div className="min-h-screen bg-slate-50">
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-green-700 transition-colors">Florida Driving Ranges</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-slate-600 font-medium">Indoor Driving Ranges</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-3">
            Indoor Driving Ranges in Florida
          </h1>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600 shadow-sm">
              <span className="font-semibold text-slate-800">{indoorRanges.length}</span> indoor ranges
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-sm text-purple-700">
              <span className="font-semibold">{highTechCount}</span> high-tech
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full text-sm text-orange-700">
              <span className="font-semibold">{cities.length}</span> cities
            </span>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Florida's indoor driving range and golf simulator scene has grown significantly in recent years. Whether you're looking to beat the afternoon rain, practice year-round in a climate-controlled environment, or play virtual rounds on famous courses, these facilities offer a quality alternative to traditional outdoor ranges across the state.
          </p>
        </div>

        {/* Range grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {indoorRanges.map((range) => (
            <RangeCard key={range.slug} range={range} />
          ))}
        </div>

        {/* Closing */}
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 max-w-3xl">
          <p className="text-slate-600 leading-relaxed">
            Florida's indoor golf venues range from boutique simulator studios to entertainment-focused bar-and-golf concepts. Many are open late and accept walk-ins, though popular venues fill up on weekends — it's worth calling ahead or booking online. For outdoor ranges and the full Florida directory, browse all facilities below.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link
              href="/"
              className="inline-block text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
            >
              ← Browse all Florida driving ranges
            </Link>
            <Link
              href="/blog/best-indoor-driving-ranges-florida"
              className="inline-block text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
            >
              Read our indoor ranges guide →
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
