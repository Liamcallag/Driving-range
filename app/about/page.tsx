import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | Florida Driving Ranges',
  description: 'Learn about Florida Driving Ranges — who we are and how we help golfers find the best practice facilities across Florida.',
};

const GREEN = '#1B3A2B';

const stats = [
  { value: '260+', label: 'Ranges listed' },
  { value: '22', label: 'Cities covered' },
  { value: '51', label: 'Indoor facilities' },
  { value: 'Free', label: 'Always free to use' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Dark hero */}
      <div className="bg-slate-900 pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">About us</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Florida's Most Complete Driving Range Guide
          </h1>
          <p className="text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            We help golfers across Florida find the right place to practice — whether that's a high-tech simulator facility or a classic outdoor grass range.
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-3xl mx-auto mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/10 p-4 text-center">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

        <div className="space-y-4 mb-12">

          <div className="border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 flex items-center justify-center text-xs font-bold border border-slate-200 text-slate-500">1</div>
              <h2 className="text-sm font-semibold" style={{ color: GREEN }}>What we do</h2>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-3">
              Florida Driving Ranges lists over 260 driving ranges and golf practice facilities across the state. From the Florida Panhandle to the Keys, we've catalogued outdoor ranges, indoor simulator facilities, and everything in between.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Every listing includes location, opening hours, amenities, tee surface type, technology (TrackMan, TopTracer, simulators), and whether food and drinks are available — so you can quickly decide whether a facility fits your needs before you make the trip.
            </p>
          </div>

          <div className="border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 flex items-center justify-center text-xs font-bold border border-slate-200 text-slate-500">2</div>
              <h2 className="text-sm font-semibold" style={{ color: GREEN }}>How we classify ranges</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { dot: 'bg-green-500', label: 'Outdoor', desc: 'Traditional open-air driving ranges with grass tees, mat bays, or both.' },
                { dot: 'bg-orange-500', label: 'Indoor', desc: 'Simulator-based facilities where you hit into a screen in a climate-controlled environment.' },
                { dot: 'bg-purple-500', label: 'High-Tech', desc: 'Ranges equipped with ball-tracking technology like TrackMan, TopTracer, or full simulators.' },
                { dot: 'bg-amber-500', label: 'Traditional', desc: 'Classic practice ranges without advanced ball-tracking or simulator technology.' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 p-3 border border-slate-200">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.dot} mt-1 shrink-0`} />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 flex items-center justify-center text-xs font-bold border border-slate-200 text-slate-500">3</div>
              <h2 className="text-sm font-semibold" style={{ color: GREEN }}>Data accuracy</h2>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Our data was last updated in March 2026. Hours, amenities, and facility details can change — always check directly with the range before visiting. If you spot an error or want to update your facility's listing, please{' '}
              <Link href="/contact" className="underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: GREEN }}>
                get in touch
              </Link>.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-white font-medium px-6 py-3 text-sm transition-colors"
            style={{ backgroundColor: GREEN }}
          >
            Browse All Ranges
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-600 font-medium px-6 py-3 text-sm transition-colors"
          >
            Contact Us
          </Link>
        </div>

      </main>
    </div>
  );
}
