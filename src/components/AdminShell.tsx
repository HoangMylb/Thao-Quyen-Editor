'use client';

import AdminSidebar from '@/components/AdminSidebar';
import { isLoggedIn, logout } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconLogout, IconMenu2, IconVideo } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ready] = useState(() => isLoggedIn());

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/login');
    }
  }, [router]);

  const handleLogout = async () => {
    logout();
    router.replace('/login');
    router.refresh();
  };

  if (!ready) {
    return (
      <div className="min-h-[100dvh] bg-[#030712] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 font-mono text-xs tracking-widest">VERIFYING ADMIN ACCESS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col lg:flex-row">
      <AdminSidebar />

      <header className="lg:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
            <IconVideo className="h-4.5 w-4.5" />
          </span>
          <span className="font-mono text-sm font-bold text-slate-900 uppercase tracking-wider">
            ADMIN CONTROL
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-500 hover:text-slate-950 rounded-lg bg-slate-100 border border-slate-200"
            aria-label="Menu"
          >
            <IconMenu2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleLogout}
            className="p-1.5 text-red-500 hover:text-red-650 rounded-lg bg-red-50 border border-red-100"
            aria-label="Đăng xuất"
          >
            <IconLogout className="w-5 h-5" />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1 z-35 sticky top-12">
          {[
            { label: 'Tổng quan', href: '/admin' },
            { label: 'Video Projects', href: '/admin/projects' },
            { label: 'Categories', href: '/admin/categories' },
            { label: 'Blog Posts', href: '/admin/posts' },
            { label: 'Cấu hình Profile', href: '/admin/settings' },
            { label: 'Xem public site', href: '/' },
          ].map((link) => (
            <Link
              key={link.href}
              onClick={() => setMobileMenuOpen(false)}
              href={link.href}
              className="block px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-950 font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <main className="flex-1 p-6 md:p-10 lg:pl-72 overflow-y-auto">{children}</main>
    </div>
  );
}
