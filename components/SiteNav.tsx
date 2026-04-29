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

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const solid = !isHome || scrolled;

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          solid
            ? 'bg-white border-b border-slate-200 shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-20 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-3 font-bold shrink-0 drop-shadow-sm transition-colors ${
              solid ? 'text-slate-800' : 'text-white'
            }`}
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
                    solid
                      ? active ? 'text-green-700' : 'text-slate-600 hover:text-green-700'
                      : active ? 'text-green-400' : 'text-white hover:text-green-400'
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
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`block w-5 h-0.5 transition-all duration-200 ${solid ? 'bg-slate-700' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 transition-all duration-200 ${solid ? 'bg-slate-700' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 transition-all duration-200 ${solid ? 'bg-slate-700' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile side drawer overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 sm:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile side drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-slate-900 shadow-xl transition-transform duration-300 ease-in-out sm:hidden flex flex-col ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-20 border-b border-slate-800 shrink-0">
          <span className="text-white font-semibold text-base">Menu</span>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-white transition-colors"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex flex-col px-4 py-6 gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = href === '/' ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  active
                    ? 'bg-slate-800 text-green-400'
                    : 'text-white hover:bg-slate-800 hover:text-green-400'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
