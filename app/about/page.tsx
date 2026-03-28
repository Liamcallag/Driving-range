import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | Florida Driving Ranges',
  description: 'Learn about Florida Driving Ranges — who we are and how we help golfers find the best practice facilities across Florida.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">About us</p>
          <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
            Florida's Most Complete Driving Range Guide
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            We help golfers across Florida find the right place to practice — whether that's a high-tech simulator facility or a classic outdoor grass range.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-slate-700 leading-relaxed">

          <section className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-800">What we do</h2>
            <p>
              Florida Driving Ranges lists over 260 driving ranges and golf practice facilities across the state. From the Florida Panhandle to the Keys, we've catalogued outdoor ranges, indoor simulator facilities, and everything in between.
            </p>
            <p>
              Every listing includes location, opening hours, amenities, tee surface type, technology (TrackMan, TopTracer, simulators), and whether food and drinks are available — so you can quickly decide whether a facility fits your needs before you make the trip.
            </p>
          </section>

          <section className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-800">How we classify ranges</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <span className="w-3 h-3 rounded-full bg-green-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Outdoor</p>
                  <p className="text-sm text-slate-500">Traditional open-air driving ranges with grass tees, mat bays, or both.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="w-3 h-3 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Indoor</p>
                  <p className="text-sm text-slate-500">Simulator-based facilities where you hit into a screen in a climate-controlled environment.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="w-3 h-3 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">High-Tech</p>
                  <p className="text-sm text-slate-500">Ranges equipped with ball-tracking technology like TrackMan, TopTracer, or full simulators.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="w-3 h-3 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Traditional</p>
                  <p className="text-sm text-slate-500">Classic practice ranges without advanced ball-tracking or simulator technology.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Data accuracy</h2>
            <p>
              Our data was last updated in March 2026. Hours, amenities, and facility details can change — always check directly with the range before visiting. If you spot an error or want to update your facility's listing, please <Link href="/contact" className="text-green-700 hover:text-green-800 underline underline-offset-2">get in touch</Link>.
            </p>
          </section>

        </div>

        {/* CTA */}
        <div className="mt-10 flex gap-3">
          <Link href="/" className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors">
            Browse All Ranges
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-600 font-medium px-5 py-2.5 rounded-xl text-sm transition-colors bg-white">
            Contact Us
          </Link>
        </div>

      </main>
    </div>
  );
}
