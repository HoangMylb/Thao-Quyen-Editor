'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!auth.isLoggedIn()) {
      router.replace('/login');
    } else {
      Promise.resolve().then(() => {
        setAuthorized(true);
      });
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-[100dvh] bg-[#030712] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 font-mono text-xs tracking-widest">VERIFYING ADMIN ACCESS...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
