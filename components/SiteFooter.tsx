import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="bg-green-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <h2 className="text-lg font-bold mb-2">Florida Driving Ranges</h2>
            <p className="text-green-100/70 text-sm leading-relaxed">
              The most complete guide to driving ranges across Florida — outdoor, indoor, and high-tech facilities statewide.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-green-400 mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-green-100/70 hover:text-white transition-colors">All Ranges</Link></li>
              <li><Link href="/indoor-driving-ranges" className="text-green-100/70 hover:text-white transition-colors">Indoor Ranges</Link></li>
              <li><Link href="/blog" className="text-green-100/70 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-green-400 mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-green-100/70 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-green-100/70 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/contact?subject=Claim%20a%20Listing" className="text-green-100/70 hover:text-white transition-colors">Claim a Listing</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-green-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-green-100/50">
          <p>© 2026 Florida Driving Ranges · All rights reserved</p>
          <p>Data accurate as of 2026 · Hours subject to change</p>
        </div>

      </div>
    </footer>
  );
}
