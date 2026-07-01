'use client';

import React, { use } from 'react';
import CategoryForm from '@/components/CategoryForm';
import { useSiteData } from '@/context/SiteDataContext';
import Link from 'next/link';
import { IconChevronLeft } from '@tabler/icons-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditCategoryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { categories } = useSiteData();
  
  const category = categories.find((c) => c.id === resolvedParams.id);

  if (!category) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 space-y-4">
        <p className="text-sm text-slate-500">Danh mục này không tồn tại hoặc đã bị xóa khỏi hệ thống.</p>
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-emerald-650 font-semibold"
        >
          <IconChevronLeft className="w-4 h-4" />
          Quay lại quản lý danh mục
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <CategoryForm category={category} />
    </div>
  );
}
