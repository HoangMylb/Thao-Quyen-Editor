'use client';

import Link from 'next/link';
import { IconArrowUpRight, IconVideo } from '@tabler/icons-react';
import { Category } from '@/lib/mockDb';

interface CategoryCardProps {
  category: Category;
  projectCount: number;
}

export default function CategoryCard({ category, projectCount }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_10px_30px_-10px_rgba(5,150,105,0.08)]"
    >
      {/* Decorative Glow background */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all duration-300 pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col gap-4">
        {/* Icon & Count */}
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <IconVideo className="h-5 w-5" />
          </span>
          <span className="font-mono text-xs text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-2.5 py-0.5">
            {projectCount} {projectCount === 1 ? 'dự án' : 'dự án'}
          </span>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors duration-200 mb-1.5 flex items-center gap-1">
            {category.name}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2">
            {category.description}
          </p>
        </div>
      </div>

      {/* Action Indicator */}
      <div className="relative z-10 mt-6 flex items-center justify-between text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Xem các video</span>
        <IconArrowUpRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
