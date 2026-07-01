'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useSiteData } from '@/context/SiteDataContext';
import ProjectCard from '@/components/ProjectCard';
import EmptyState from '@/components/EmptyState';
import { IconChevronLeft } from '@tabler/icons-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { projects, categories } = useSiteData();

  const category = categories.find((c) => c.slug.toLowerCase() === resolvedParams.slug.toLowerCase());

  if (!category) {
    return (
      <div className="mx-auto max-w-xl text-center py-24 px-4">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Không tìm thấy danh mục</h2>
        <p className="text-sm text-slate-500 mb-6">Danh mục này không tồn tại hoặc đã được gỡ bỏ khỏi hệ thống.</p>
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
        >
          Xem tất cả danh mục
        </Link>
      </div>
    );
  }

  // Filter projects by this category (only show published)
  const categoryProjects = projects.filter(
    (p) => p.category_id.toLowerCase() === category.id.toLowerCase() && p.is_published
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/categories"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors font-semibold"
        >
          <IconChevronLeft className="w-4 h-4" />
          Tất cả danh mục
        </Link>
      </div>

      {/* Category Info Header */}
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Danh mục: {category.name}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          {category.description}
        </p>
        <div className="text-xs text-primary font-mono">
          Tìm thấy {categoryProjects.length} video trong mục này.
        </div>
      </div>

      {/* Category Projects Grid */}
      {categoryProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              categoryName={category.name}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Chưa có video trong mục này"
          message="Các sản phẩm thuộc danh mục này hiện đang được chuẩn bị và sẽ sớm được đăng tải."
        />
      )}
    </div>
  );
}
