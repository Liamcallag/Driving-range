'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Directory' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 inset-x-0 z-50 h-14 flex items-center transition-colors ${
        isHome
          ? 'bg-black/30 backdrop-blur-md border-b border-white/10'
          : 'bg-white border-b border-slate-200 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className={`flex items-center gap-2 font-bold text-sm sm:text-base shrink-0 ${
            isHome ? 'text-white' : 'text-green-800'
          }`}
        >
          <Image src="/images/logo.png" alt="" width={84} height={84} className="rounded-sm" aria-hidden="true" />
          <span>Florida Driving Ranges</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = href === '/' ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isHome
                    ? active
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                    : active
                      ? 'bg-green-50 text-green-700'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
