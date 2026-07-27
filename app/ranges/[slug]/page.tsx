import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import RangeDetailMapWrapper from '@/components/RangeDetailMapWrapper';
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
    (range.grass === 'No' || range.grass === 'Both' || range.grass === 'Unknown' || range.grass === '') && 'Mat Tees',
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
      geo: { '@type': 'GeoCoordinates', latitude: range.lat, longitude: range.lng },
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

function Divider() {
  return <div className="border-t border-slate-100" />;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-5 flex gap-8">
      <span
        className="text-xs font-semibold uppercase tracking-widest w-24 flex-shrink-0 pt-0.5"
        style={{ color: '#1B3A2B' }}
      >
        {label}
      </span>
      <div className="flex-1 min-w-0">{children}</div>
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

  const claimSubject = encodeURIComponent(`Claim Listing: ${range.name}`);
  const claimBody = encodeURIComponent(
    `Hi,\n\nI would like to claim or update the listing for:\n\nName: ${range.name}\nAddress: ${range.address}\nWebsite: ${range.website || 'N/A'}\n\nPlease contact me to verify ownership.\n\nThanks`
  );

  const techTags = [
    range.trackman === 'Yes' && 'TrackMan',
    range.toptracer === 'Yes' && 'TopTracer',
  ].filter(Boolean) as string[];

  const amenityTags = [
    range.foodBar === 'Yes' && 'Food & Bar',
    !isIndoor && range.lighting === 'Yes' && 'Night Lights',
    !isIndoor && range.roof === 'Yes' && 'Covered',
    !isIndoor && (range.grass === 'Yes' || range.grass === 'Both') && 'Grass Tees',
    !isIndoor && (range.grass === 'No' || range.grass === 'Unknown' || range.grass === '') && 'Mats',
  ].filter(Boolean) as string[];

  const hasMap = !!(range.lat && range.lng);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">

        {/* Back */}
        <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors mb-8 block">
          ← All ranges
        </Link>

        {/* Status + Name + Location */}
        <div className="mb-7">
          <div className="flex items-center gap-1.5 mb-2">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: isOpen ? '#2E7D32' : '#C62828' }}
            />
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: isOpen ? '#2E7D32' : '#C62828' }}>
              {isOpen ? 'Open' : 'Closed'}
            </span>
          </div>
          <h1 className="text-3xl font-bold leading-tight" style={{ color: '#1B3A2B' }}>{range.name}</h1>
          <p className="text-sm text-slate-400 mt-1">
            {range.city}, Florida{range.address ? ` · ${range.address}` : ''}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs font-medium px-2.5 py-1 border border-slate-200 text-slate-500">
            {isIndoor ? 'Indoor' : 'Outdoor'}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 border border-slate-200 text-slate-500">
            {range.techLevel === 'high' ? 'High-Tech' : 'Traditional'}
          </span>
          {techTags.map((t) => (
            <span key={t} className="text-xs font-medium px-2.5 py-1 border" style={{ color: '#1B5E5E', borderColor: '#cde0e0' }}>
              {t}
            </span>
          ))}
          {amenityTags.map((t) => (
            <span key={t} className="text-xs font-medium px-2.5 py-1 border border-slate-200 text-slate-500">
              {t}
            </span>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left column — main content */}
          <div className="flex-1 min-w-0">

            {/* Description */}
            {range.description && (
              <>
                <Divider />
                <div className="py-5">
                  <p className="text-sm text-slate-800 leading-relaxed">{range.description}</p>
                </div>
              </>
            )}

            {/* Hours */}
            {Object.keys(hours).length > 0 && (
              <>
                <Divider />
                <Row label="Hours">
                  <div className="space-y-1.5">
                    {DAYS.map((day) => {
                      const isToday = day === todayName;
                      const dayHours = isToday && todayHours !== 'Hours unavailable' ? todayHours : (hours[day] ?? 'Closed');
                      const isClosed = dayHours.toLowerCase() === 'closed';
                      return (
                        <div key={day} className="flex gap-6 text-sm">
                          <span className={`w-24 flex-shrink-0 ${isToday ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                            {day}
                          </span>
                          <span className={isClosed ? 'text-slate-300' : isToday ? 'font-bold text-slate-900' : 'text-slate-700 font-medium'}>
                            {dayHours}
                          </span>
                        </div>
                      );
                    })}
                    <p className="text-xs text-slate-300 pt-2">Data as of {DATA_AS_OF}</p>
                  </div>
                </Row>
              </>
            )}

            {/* Location */}
            {range.address && (
              <>
                <Divider />
                <Row label="Location">
                  <p className="text-sm font-medium text-slate-800">{range.address}</p>
                </Row>
              </>
            )}

            {/* Phone */}
            {range.phone && (
              <>
                <Divider />
                <Row label="Phone">
                  <a href={`tel:${range.phone}`} className="text-sm font-medium text-slate-800 hover:text-slate-900 transition-colors">
                    {range.phone}
                  </a>
                </Row>
              </>
            )}

            {/* Reviews */}
            <Divider />
            <div className="py-5">
              <ReviewSection slug={range.slug} />
            </div>

          </div>

          {/* Right column — map + links */}
          <div className="w-full lg:w-72 flex-shrink-0 space-y-3">

            {/* Map */}
            {hasMap && (
              <div className="overflow-hidden rounded-sm border border-slate-100">
                <RangeDetailMapWrapper lat={range.lat as number} lng={range.lng as number} />
                {range.locationLink && (
                  <div className="px-3 py-2 border-t border-slate-100">
                    <a
                      href={range.locationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Website */}
            {range.website && (
              <div className="px-3 py-3" style={{ backgroundColor: '#f5f7f5', borderLeft: '3px solid #1B3A2B' }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#1B3A2B' }}>Website</p>
                <a
                  href={range.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                  style={{ color: '#1B3A2B' }}
                >
                  Visit website →
                </a>
              </div>
            )}

            {/* Claim listing */}
            <div className="px-3 py-3 bg-slate-50">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-0.5">Own this range?</p>
              <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                Claim your listing to update hours, add photos, or correct information.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${claimSubject}&body=${claimBody}`}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 px-3 py-1.5 transition-colors"
              >
                <svg className="w-3.5 h-3.5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Claim this listing
              </a>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
