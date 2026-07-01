'use client';

export default function LoadingState() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse flex flex-col gap-4 border border-card-border bg-card-bg rounded-2xl p-4">
          <div className="bg-slate-100 rounded-xl aspect-video w-full"></div>
          <div className="h-5 bg-slate-100 rounded w-3/4"></div>
          <div className="h-4 bg-slate-100 rounded w-1/3"></div>
          <div className="space-y-2 mt-2">
            <div className="h-3 bg-slate-100 rounded w-full"></div>
            <div className="h-3 bg-slate-100 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
