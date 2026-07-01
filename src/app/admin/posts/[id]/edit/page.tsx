'use client';

import React, { use } from 'react';
import PostForm from '@/components/PostForm';
import { useSiteData } from '@/context/SiteDataContext';
import Link from 'next/link';
import { IconChevronLeft } from '@tabler/icons-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { posts } = useSiteData();
  
  const post = posts.find((p) => p.id.toLowerCase() === resolvedParams.id.toLowerCase());

  if (!post) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 space-y-4">
        <p className="text-sm text-slate-500">Bài viết này không tồn tại hoặc đã bị xóa khỏi hệ thống.</p>
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-emerald-650 font-semibold"
        >
          <IconChevronLeft className="w-4 h-4" />
          Quay lại quản lý bài viết
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PostForm post={post} />
    </div>
  );
}
