'use client';

import Link from 'next/link';
import { IconCalendar, IconArrowRight } from '@tabler/icons-react';
import { Post } from '@/lib/types';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Format Vietnamese date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card-bg transition-all duration-300 hover:border-primary/20 hover:shadow-[0_10px_30px_-10px_rgba(5,150,105,0.08)]">
      {/* Thumbnail */}
      <Link href={`/blog/${post.slug}`} className="relative aspect-video w-full overflow-hidden bg-slate-100">
        {post.thumbnail_url && (post.thumbnail_url.startsWith('data:video/') || post.thumbnail_url.includes('.mp4') || post.thumbnail_url.includes('video')) ? (
          <video
            src={post.thumbnail_url}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <img
            src={post.thumbnail_url && (post.thumbnail_url.includes('youtube.com') || post.thumbnail_url.includes('youtu.be'))
              ? `https://img.youtube.com/vi/${post.thumbnail_url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)?.[2] || ''}/0.jpg`
              : post.thumbnail_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2 font-mono">
          <IconCalendar className="w-3.5 h-3.5 text-slate-400" />
          {formatDate(post.published_at || post.created_at)}
        </div>

        <Link href={`/blog/${post.slug}`} className="group/title">
          <h3 className="text-base font-bold text-slate-900 group-hover/title:text-primary transition-colors duration-200 line-clamp-2 mb-2 leading-snug">
            {post.title}
          </h3>
        </Link>

        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Read More link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-emerald-600 transition-colors pt-2 border-t border-card-border"
        >
          Đọc bài viết
          <IconArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
