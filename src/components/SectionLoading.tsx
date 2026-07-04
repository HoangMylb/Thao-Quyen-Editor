'use client';

interface SectionLoadingProps {
  title?: string;
  lines?: number;
}

export default function SectionLoading({ title = 'Đang tải dữ liệu...', lines = 3 }: SectionLoadingProps) {
  return (
    <div className="rounded-2xl border border-card-border bg-white p-6 shadow-sm">
      <div className="space-y-4 animate-pulse">
        <div className="space-y-2">
          <div className="h-5 w-40 rounded bg-slate-200" />
          <div className="h-3 w-64 rounded bg-slate-100" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: lines }).map((_, index) => (
            <div key={index} className="h-20 rounded-2xl bg-slate-100" />
          ))}
        </div>
        <p className="text-xs font-semibold text-slate-400">{title}</p>
      </div>
    </div>
  );
}
