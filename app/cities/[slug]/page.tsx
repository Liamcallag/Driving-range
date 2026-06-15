import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import rangesData from '@/data/ranges.json';
import { Range } from '@/lib/types';
import { CITY_PAGES, getCityBySlug, NEARBY_CITIES, CITY_BLOG_POSTS } from '@/lib/cities';
import { SITE_URL } from '@/lib/config';
import RangeCard from '@/components/RangeCard';

const ranges = rangesData as Range[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CITY_PAGES.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: 'Not Found' };

  const cityRanges = ranges.filter((r) => city.cities.includes(r.city));

  return {
    title: `Best Driving Ranges in ${city.name}, FL | Florida Driving Ranges`,
    description: `Find the best driving ranges in ${city.name}, FL. Browse ${cityRanges.length} local ranges — outdoor, indoor, and high-tech facilities with TrackMan, TopTracer, hours, and directions.`,
    openGraph: {
      title: `Best Driving Ranges in ${city.name}, FL | Florida Driving Ranges`,
      description: `Find the best driving ranges in ${city.name}, Florida. Browse ${cityRanges.length} local ranges with hours, amenities, and directions.`,
      url: `${SITE_URL}/cities/${slug}`,
      siteName: 'Florida Driving Ranges',
      type: 'website',
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const cityRanges = ranges.filter((r) => city.cities.includes(r.city));
  const outdoorCount = cityRanges.filter((r) => r.category === 'outdoor').length;
  const indoorCount = cityRanges.filter((r) => r.category === 'indoor').length;
  const highTechCount = cityRanges.filter((r) => r.techLevel === 'high').length;

  return (
    <div className="min-h-screen bg-slate-50">
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-green-700 transition-colors">Florida Driving Ranges</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-slate-600 font-medium">{city.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-3">
            Best Driving Ranges in {city.name}, FL
          </h1>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600 shadow-sm">
              <span className="font-semibold text-slate-800">{cityRanges.length}</span> ranges total
            </span>
            {outdoorCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-sm text-green-700">
                <span className="font-semibold">{outdoorCount}</span> outdoor
              </span>
            )}
            {indoorCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full text-sm text-orange-700">
                <span className="font-semibold">{indoorCount}</span> indoor / simulator
              </span>
            )}
            {highTechCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-sm text-purple-700">
                <span className="font-semibold">{highTechCount}</span> high-tech
              </span>
            )}
          </div>

          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            {city.intro}
          </p>
        </div>

        {/* Range grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {cityRanges.map((range) => (
            <RangeCard key={range.slug} range={range} />
          ))}
        </div>

        {/* Closing */}
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 max-w-3xl">
          <p className="text-slate-600 leading-relaxed">{city.closing}</p>
          <Link
            href="/"
            className="inline-block mt-4 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
          >
            ← Browse all Florida driving ranges
          </Link>
        </div>

        {/* City Blog Posts */}
        {CITY_BLOG_POSTS[slug] && (
          <div className="mt-8 max-w-3xl">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Guides & Resources</h2>
            <div className="flex flex-col gap-2">
              {CITY_BLOG_POSTS[slug].map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 hover:border-green-500 hover:text-green-700 rounded-lg text-sm font-medium text-slate-700 transition-colors"
                >
                  <span>📖</span> {post.label} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Nearby Cities */}
        {NEARBY_CITIES[slug] && (
          <div className="mt-8 max-w-3xl">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Explore Nearby Areas</h2>
            <div className="flex flex-wrap gap-2">
              {NEARBY_CITIES[slug].map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/cities/${nearby.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 hover:border-green-500 hover:text-green-700 rounded-lg text-sm font-medium text-slate-700 transition-colors"
                >
                  {nearby.name} →
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
