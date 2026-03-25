import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import rangesData from '@/data/ranges.json';
import { Range } from '@/lib/types';
import { getOpenStatus } from '@/lib/utils';
import { CONTACT_EMAIL, DATA_AS_OF, SITE_URL } from '@/lib/config';
import ReviewSection from '@/components/ReviewSection';

const ranges = rangesData as Range[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ranges.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const range = ranges.find((r) => r.slug === slug);
  if (!range) return { title: 'Range Not Found' };

  const description = range.description
    ? range.description.slice(0, 155)
    : `${range.name} in ${range.city}, Florida. ${range.category === 'indoor' ? 'Indoor simulator' : 'Outdoor'} driving range.`;

  return {
    title: `${range.name} | Florida Driving Ranges`,
    description,
    openGraph: {
      title: `${range.name} | Florida Driving Ranges`,
      description,
      url: `${SITE_URL}/ranges/${slug}`,
      siteName: 'Florida Driving Ranges',
      type: 'website',
    },
  };
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Day abbreviations for JSON-LD
const DAY_SCHEMA: Record<string, string> = {
  Monday: 'Mo', Tuesday: 'Tu', Wednesday: 'We', Thursday: 'Th',
  Friday: 'Fr', Saturday: 'Sa', Sunday: 'Su',
};

function parseHours(workingHoursJson: string): Record<string, string> {
  if (!workingHoursJson) return {};
  try {
    const parsed = JSON.parse(workingHoursJson);
    const result: Record<string, string> = {};
    for (const day of DAYS) {
      result[day] = parsed[day]?.[0] ?? 'Closed';
    }
    return result;
  } catch {
    return {};
  }
}

function buildJsonLd(range: Range, hours: Record<string, string>) {
  // Build openingHoursSpecification
  const openingHours = DAYS
    .filter((d) => hours[d] && hours[d].toLowerCase() !== 'closed')
    .map((d) => {
      const parts = hours[d].split('-');
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${d}`,
        opens: parts[0]?.trim() ?? '',
        closes: parts[1]?.trim() ?? '',
      };
    });

  const amenities = [
    range.trackman === 'Yes' && 'TrackMan Ball Tracking',
    range.toptracer === 'Yes' && 'TopTracer Technology',
    range.foodBar === 'Yes' && 'Food and Bar',
    range.lighting === 'Yes' && 'Night Lighting',
    range.roof === 'Yes' && 'Covered Bays',
    (range.grass === 'Yes' || range.grass === 'Both') && 'Grass Tees',
    (range.grass === 'No' || range.grass === 'Both') && 'Mat Tees',
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: range.name,
    description: range.description || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: range.street,
      addressLocality: range.city,
      addressRegion: 'FL',
      postalCode: range.postalCode,
      addressCountry: 'US',
    },
    ...(range.phone && { telephone: range.phone }),
    ...(range.website && { url: range.website }),
    ...(range.lat && range.lng && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: range.lat,
        longitude: range.lng,
      },
    }),
    ...(openingHours.length > 0 && { openingHoursSpecification: openingHours }),
    ...(amenities.length > 0 && {
      amenityFeature: amenities.map((name) => ({
        '@type': 'LocationFeatureSpecification',
        name,
        value: true,
      })),
    }),
    additionalType: 'https://schema.org/GolfCourse',
  };
}

function FeatureItem({ label, value, icon }: { label: string; value: string; icon: string }) {
  const isYes = value === 'Yes';
  const isNo = value === 'No';
  const isUnknown = !isYes && !isNo;
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border ${
        isYes ? 'bg-emerald-50 border-emerald-100'
        : isNo ? 'bg-slate-50 border-slate-100'
        : 'bg-slate-50 border-slate-100 opacity-60'
      }`}
    >
      <span className="text-xl" aria-hidden="true">{icon}</span>
      <div>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
        <p className={`text-sm font-semibold ${isYes ? 'text-emerald-700' : isNo ? 'text-slate-500' : 'text-slate-400'}`}>
          {isUnknown ? '—' : value}
        </p>
      </div>
    </div>
  );
}

export default async function RangePage({ params }: PageProps) {
  const { slug } = await params;
  const range = ranges.find((r) => r.slug === slug);
  if (!range) notFound();

  const { isOpen, status, todayHours } = getOpenStatus(range.workingHours);
  const hours = parseHours(range.workingHours);
  const jsonLd = buildJsonLd(range, hours);

  const todayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
  const isIndoor = range.category === 'indoor';

  const teeItems: { label: string; value: string; icon: string }[] = [];
  if (!isIndoor) {
    if (range.grass === 'Yes' || range.grass === 'Both') teeItems.push({ label: 'Grass Tees', value: 'Yes', icon: '🌿' });
    if (range.grass === 'No' || range.grass === 'Both') teeItems.push({ label: 'Mats', value: 'Yes', icon: '🟫' });
  }

  const claimSubject = encodeURIComponent(`Claim Listing: ${range.name}`);
  const claimBody = encodeURIComponent(
    `Hi,\n\nI would like to claim or update the listing for:\n\nName: ${range.name}\nAddress: ${range.address}\nWebsite: ${range.website || 'N/A'}\n\nPlease contact me to verify ownership.\n\nThanks`
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left / main content ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title block */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 leading-tight">{range.name}</h1>
              <p className="text-slate-500 mt-1">
                {range.city}, Florida{range.address ? ` · ${range.address}` : ''}
              </p>
              <div className="flex flex-wrap gap-2 mt-3 items-center">
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${isIndoor ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {isIndoor ? 'Indoor' : 'Outdoor'}
                </span>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${range.techLevel === 'high' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'}`}>
                  {range.techLevel === 'high' ? 'High-Tech' : 'Traditional'}
                </span>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                  {status}
                </span>
              </div>
            </div>

            {/* Description */}
            {range.description && (
              <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-6">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">About</h2>
                <p className="text-slate-700 leading-relaxed">{range.description}</p>
              </div>
            )}

            {/* Features grid */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Amenities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <FeatureItem label="TrackMan" value={range.trackman} icon="📡" />
                <FeatureItem label="TopTracer" value={range.toptracer} icon="🎯" />
                {!isIndoor && <FeatureItem label="Lighting" value={range.lighting} icon="💡" />}
                {!isIndoor && <FeatureItem label="Roof / Cover" value={range.roof} icon="🏠" />}
                {teeItems.map((item) => (
                  <FeatureItem key={item.label} label={item.label} value={item.value} icon={item.icon} />
                ))}
                <FeatureItem label="Food & Bar" value={range.foodBar} icon="🍺" />
                <FeatureItem label="Dress Code" value={range.dresscode} icon="👔" />
              </div>
            </div>

            {/* Hours */}
            {Object.keys(hours).length > 0 && (
              <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Hours</h2>
                  <span className="text-xs text-slate-400">Data as of {DATA_AS_OF}</span>
                </div>
                <div className="space-y-1">
                  {DAYS.map((day) => {
                    const isToday = day === todayName;
                    const dayHours = hours[day] ?? 'Unknown';
                    const isClosed = dayHours.toLowerCase() === 'closed';
                    return (
                      <div key={day} className={`flex items-center justify-between py-2 px-3 rounded-lg ${isToday ? 'bg-green-50 border border-green-100' : ''}`}>
                        <span className={`text-sm ${isToday ? 'font-bold text-green-800' : 'text-slate-600'}`}>
                          {day}
                          {isToday && (
                            <span className="ml-2 text-xs font-medium bg-green-700 text-white px-1.5 py-0.5 rounded">Today</span>
                          )}
                        </span>
                        <span className={`text-sm ${isClosed ? 'text-red-500 font-medium' : isToday ? 'font-bold text-green-800' : 'text-slate-700'}`}>
                          {isToday && todayHours !== 'Hours unavailable' ? todayHours : dayHours}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reviews */}
            <ReviewSection slug={range.slug} />
          </div>

          {/* ── Right sidebar ── */}
          <div className="space-y-5">

            {/* Contact & links */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5 space-y-3">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Contact & Links</h2>
              {range.website && (
                <a href={range.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
                  <span aria-hidden="true">🌐</span> Visit Website
                </a>
              )}
              {range.locationLink && (
                <a href={range.locationLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
                  <span aria-hidden="true">📍</span> Google Maps
                </a>
              )}
              {range.phone && (
                <a href={`tel:${range.phone}`}
                  className="flex items-center gap-2 w-full border border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
                  <span aria-hidden="true">📞</span> {range.phone}
                </a>
              )}
            </div>

            {/* Quick info */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Info</h2>
              <dl className="space-y-2">
                {range.city && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-slate-500">City</dt>
                    <dd className="font-medium text-slate-800">{range.city}</dd>
                  </div>
                )}
                {range.postalCode && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-slate-500">ZIP Code</dt>
                    <dd className="font-medium text-slate-800">{range.postalCode}</dd>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <dt className="text-slate-500">Type</dt>
                  <dd className="font-medium text-slate-800 capitalize">{range.category}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-slate-500">Technology</dt>
                  <dd className="font-medium text-slate-800">{range.techLevel === 'high' ? 'High-Tech' : 'Traditional'}</dd>
                </div>
                <div className="flex justify-between text-sm pt-1 border-t border-slate-100 mt-1">
                  <dt className="text-slate-400">Last updated</dt>
                  <dd className="text-slate-400 text-xs">{DATA_AS_OF}</dd>
                </div>
              </dl>
            </div>

            {/* Claim listing */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-slate-600 mb-1">Own this range?</h2>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Claim your listing to update hours, add photos, or correct information.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${claimSubject}&body=${claimBody}`}
                className="flex items-center justify-center gap-2 w-full border border-slate-300 hover:border-green-400 hover:bg-green-50 text-slate-600 hover:text-green-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Claim this listing
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-slate-400">
          <Link href="/" className="hover:text-green-700 transition-colors">
            ← Back to Florida Driving Ranges Directory
          </Link>
        </div>
      </footer>
    </div>
  );
}
