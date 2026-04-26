'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = () => setMenuOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [menuOpen]);

  const solid = !isHome || scrolled;

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-green-700 border-b border-green-600 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-20 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-bold shrink-0 text-white drop-shadow-sm"
        >
          <Image src="/images/logo.png" alt="" width={36} height={36} aria-hidden="true" />
          <span className="text-lg sm:text-xl tracking-tight">Florida Driving Ranges</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = href === '/' ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`px-3 py-2 text-base font-medium transition-colors ${
                  active
                    ? 'text-green-200'
                    : 'text-white hover:text-green-200'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger button */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg shrink-0"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
        >
          <span className={`block w-5 h-0.5 transition-all duration-200 bg-white ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 transition-all duration-200 bg-white ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 transition-all duration-200 bg-white ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="sm:hidden bg-green-900 border-t border-green-800 px-4 py-3 flex flex-col gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = href === '/' ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`px-3 py-2.5 text-base font-medium transition-colors ${
                  active
                    ? 'text-green-200'
                    : 'text-white hover:text-green-200'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
