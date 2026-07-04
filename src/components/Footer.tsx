'use client';

import Link from 'next/link';
import { IconBrandFacebook } from '@tabler/icons-react';
import { useSiteData } from '@/context/SiteDataContext';

export default function Footer() {
  const { profile } = useSiteData();

  return (
    <footer className="bg-slate-50 border-t border-card-border py-12 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Headline */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="font-mono text-xl font-bold tracking-wider text-slate-900">
              {profile?.full_name?.toUpperCase() || 'THẢO QUYÊN'}
            </Link>
            <p className="text-sm max-w-sm text-slate-500">
              {profile?.headline || 'Creative Video Editor for Brands, Creators & Businesses.'}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              {profile?.facebook_url && (
                <a href={profile.facebook_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <IconBrandFacebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 tracking-widest uppercase mb-4">Danh mục chính</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-slate-900 transition-colors">Trang chủ</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-slate-900 transition-colors">Dự án Portfolio</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-slate-900 transition-colors">Phân loại video</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-slate-900 transition-colors">Bài viết chia sẻ</Link>
              </li>
            </ul>
          </div>

          {/* Admin panel & contact */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 tracking-widest uppercase mb-4">Thông tin thêm</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-slate-900 transition-colors">Giới thiệu</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900 transition-colors">Liên hệ làm việc</Link>
              </li>
              <li className="pt-2 border-t border-card-border">
                <Link href="/admin" className="text-[10px] text-slate-400 hover:text-primary transition-colors font-mono">
                  [QUẢN TRỊ VIÊN]
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-card-border flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {profile?.full_name}.</p>
        </div>
      </div>
    </footer>
  );
}
