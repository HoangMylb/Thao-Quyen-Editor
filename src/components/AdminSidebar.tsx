'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { logout } from '@/lib/api';
import {
  IconLayoutDashboard,
  IconVideo,
  IconCategory,
  IconArticle,
  IconSettings,
  IconLogout,
  IconArrowLeft,
  IconUser
} from '@tabler/icons-react';
import { useSiteData } from '@/context/SiteDataContext';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, profileLoading } = useSiteData();

  const menuItems = [
    { label: 'Tổng quan', href: '/admin', icon: <IconLayoutDashboard className="w-5 h-5" /> },
    { label: 'Video Projects', href: '/admin/projects', icon: <IconVideo className="w-5 h-5" /> },
    { label: 'Categories', href: '/admin/categories', icon: <IconCategory className="w-5 h-5" /> },
    { label: 'Blog Posts', href: '/admin/posts', icon: <IconArticle className="w-5 h-5" /> },
    { label: 'Cấu hình Profile', href: '/admin/settings', icon: <IconSettings className="w-5 h-5" /> },
  ];

  const handleLogout = async () => {
    logout();
    router.replace('/login');
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white py-8 px-4 lg:flex flex-col justify-between">
      {/* Top Section */}
      <div className="space-y-8">
        {/* Profile Tagline */}
        <div className="flex items-center gap-3 px-2">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-emerald-500/20 bg-emerald-50 flex items-center justify-center text-emerald-600">
            {!profileLoading && profile?.avatar_url ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.avatar_url} alt={profile.full_name} className="h-full w-full object-cover" />
              </>
            ) : (
              <IconUser className="w-5 h-5" />
            )}
          </div>
          <div>
            {profileLoading ? (
              <div className="space-y-1.5 animate-pulse">
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="h-2 w-16 rounded bg-slate-100" />
              </div>
            ) : (
              <h4 className="text-sm font-bold text-slate-900 leading-none">{profile?.full_name || 'Thảo Quyên'}</h4>
            )}
            <span className="text-[10px] text-emerald-700 font-mono tracking-wider uppercase mt-1 block">Administrator</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                isActive(item.href)
                  ? 'bg-emerald-50 border border-emerald-100/50 text-emerald-700'
                  : 'text-slate-500 border border-transparent hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="space-y-2">
        {/* Back to Client Site */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs text-slate-400 hover:text-slate-700 transition-colors"
        >
          <IconArrowLeft className="w-4 h-4" />
          Xem trang public
        </Link>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 hover:text-red-700 border border-transparent transition-all"
        >
          <IconLogout className="w-5 h-5" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
