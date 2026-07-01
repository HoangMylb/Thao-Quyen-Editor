'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isLoggedIn, login } from '@/lib/api';
import { IconLock, IconMail, IconArrowLeft, IconVideo } from '@tabler/icons-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace('/admin');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      setLoading(false);
      router.replace('/admin');
      router.refresh();
    } catch (error) {
      setLoading(false);
      setError(error instanceof Error ? error.message : 'Email hoặc mật khẩu không chính xác.');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#f8fafc] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Back Link */}
        <div className="text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors"
          >
            <IconArrowLeft className="w-3.5 h-3.5" />
            Quay lại trang chủ
          </Link>
        </div>

        {/* Card Frame */}
        <div className="border border-slate-200 bg-white p-8 rounded-3xl space-y-6 shadow-lg">
          {/* Logo Branding */}
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <IconVideo className="h-6 w-6" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-wide uppercase">Đăng nhập Admin</h2>
            <p className="text-xs text-slate-550 max-w-xs leading-relaxed text-slate-500">
              Trang đăng nhập dành cho Quản trị viên quản lý nội dung danh mục dự án và bài viết của Thảo Quyên.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 p-3.5 text-center text-xs font-semibold text-red-650 text-red-650 text-red-650 text-red-650 text-red-600">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-600">Email quản trị viên</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400">
                  <IconMail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="admin@thaoquyen.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-slate-600">Mật khẩu bảo mật</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400">
                  <IconLock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Hint Box */}
            <div className="rounded-xl bg-emerald-50 border border-emerald-100/50 p-3 text-center text-[10px] text-emerald-700 leading-relaxed font-mono">
              Demo Account: admin@thaoquyen.com / admin123
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-primary py-3.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:bg-emerald-600/50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập hệ thống'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
