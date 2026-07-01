'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconMenu2, IconX, IconVideo } from '@tabler/icons-react';
import { useMockDb } from '@/context/MockDbContext';

export default function Navbar() {
  const pathname = usePathname();
  const { profile } = useMockDb();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Dự án', href: '/portfolio' },
    { label: 'Danh mục', href: '/categories' },
    { label: 'Bài viết', href: '/blog' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Liên hệ', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Branding */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300">
                <IconVideo className="h-5 w-5" />
              </span>
              <span className="font-mono text-lg font-bold tracking-wider text-slate-900 group-hover:text-primary transition-colors duration-300">
                {profile?.full_name?.toUpperCase() || 'THẢO QUYÊN'}
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                    isActive(link.href) ? 'text-primary font-semibold' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* CTA Button */}
            <Link
              href="/contact"
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 active:scale-95 transition-all duration-200"
            >
              {profile?.cta_text || 'Hợp tác ngay'}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <IconX className="h-6 w-6" /> : <IconMenu2 className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-card-border bg-background px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              onClick={() => setIsOpen(false)}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-base font-medium hover:bg-slate-100 hover:text-primary ${
                isActive(link.href) ? 'bg-slate-100 text-primary font-semibold' : 'text-slate-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-card-border">
            <Link
              onClick={() => setIsOpen(false)}
              href="/contact"
              className="flex w-full items-center justify-center rounded-lg bg-primary py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              {profile?.cta_text || 'Hợp tác ngay'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
