'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useSiteData } from '@/context/SiteDataContext';
import {
  IconChevronLeft,
  IconCalendar,
  IconClock,
  IconUser,
  IconSend
} from '@tabler/icons-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { posts, profile } = useSiteData();

  const post = posts.find((p) => p.slug === resolvedParams.slug && p.status === 'published');

  if (!post) {
    return (
      <div className="mx-auto max-w-xl text-center py-24 px-4">
        <h2 className="text-xl font-bold text-white mb-2">Không tìm thấy bài viết</h2>
        <p className="text-sm text-gray-500 mb-6">Bài viết này không tồn tại hoặc đã được gỡ bỏ khỏi chế độ hiển thị công khai.</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-[#030712] hover:bg-emerald-400"
        >
          Quay lại danh mục blog
        </Link>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Convert simple markdown headings, lists, quotes & bold to react tags
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();
      
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-bold text-slate-900 mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-card-border pb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-4 py-1 my-6 text-slate-700 italic bg-emerald-50 border-emerald-500/20 rounded-r-xl">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }
      
      // Bullets list
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map((item, itemIdx) => {
          const itemTrimmed = item.trim().replace('- ', '');
          const parts = itemTrimmed.split('**');
          return (
            <li key={itemIdx} className="list-disc list-inside text-slate-600 mb-2 leading-relaxed">
              {parts.map((part, partIdx) => 
                partIdx % 2 === 1 ? <strong key={partIdx} className="text-slate-950 font-bold">{part}</strong> : part
              )}
            </li>
          );
        });
        return <ul key={index} className="space-y-1 my-4 pl-2">{items}</ul>;
      }
      
      // Parse numbered lists
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').map((item, itemIdx) => {
          const itemTrimmed = item.trim().replace(/^\d+\.\s/, '');
          const parts = itemTrimmed.split('**');
          return (
            <li key={itemIdx} className="list-decimal list-inside text-slate-600 mb-2 leading-relaxed">
              {parts.map((part, partIdx) => 
                partIdx % 2 === 1 ? <strong key={partIdx} className="text-slate-950 font-bold">{part}</strong> : part
              )}
            </li>
          );
        });
        return <ol key={index} className="space-y-1 my-4 pl-2">{items}</ol>;
      }

      // Parse bold tags **text** -> <strong>text</strong>
      const parts = trimmed.split('**');
      if (parts.length > 1) {
        return (
          <p key={index} className="text-sm text-slate-600 leading-relaxed mb-4">
            {parts.map((part, partIdx) => 
              partIdx % 2 === 1 ? <strong key={partIdx} className="text-slate-950 font-bold">{part}</strong> : part
            )}
          </p>
        );
      }

      return (
        <p key={index} className="text-sm text-slate-600 leading-relaxed mb-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors font-semibold"
        >
          <IconChevronLeft className="w-4 h-4" />
          Quay lại danh sách blog
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono border-b border-card-border pb-6">
          <span className="flex items-center gap-1">
            <IconCalendar className="w-4 h-4" />
            {formatDate(post.published_at || post.created_at)}
          </span>
          <span className="flex items-center gap-1">
            <IconUser className="w-4 h-4" />
            Bởi {profile?.full_name || 'Thảo Quyên'}
          </span>
          <span className="flex items-center gap-1">
            <IconClock className="w-4 h-4" />
            5 phút đọc
          </span>
        </div>
      </div>

      {/* Featured Media (Video or Image) */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 border border-card-border">
        {post.thumbnail_url && (post.thumbnail_url.startsWith('data:video/') || post.thumbnail_url.includes('.mp4') || post.thumbnail_url.includes('video')) ? (
          <video
            src={post.thumbnail_url}
            controls
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={post.thumbnail_url && (post.thumbnail_url.includes('youtube.com') || post.thumbnail_url.includes('youtu.be'))
              ? `https://img.youtube.com/vi/${post.thumbnail_url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)?.[2] || ''}/0.jpg`
              : post.thumbnail_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Post Content */}
      <div className="prose prose-slate max-w-none py-4 border-b border-card-border text-slate-700">
        {renderContent(post.content)}
      </div>

      {/* CTA Section */}
      <div className="bg-white shadow-sm border border-card-border p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
        <div className="space-y-2 text-center md:text-left">
          <h4 className="text-base font-bold text-slate-900">Bạn muốn tìm hiểu thêm về kỹ thuật dựng video?</h4>
          <p className="text-xs text-slate-600 max-w-md leading-relaxed">
            Thảo Quyên hỗ trợ biên tập nội dung, tối ưu SEO video ngắn và hậu kỳ chuyên nghiệp. Đừng ngần ngại liên hệ để nhận tư vấn chi tiết.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-xs font-bold text-white hover:bg-emerald-500 active:scale-95 transition-all whitespace-nowrap"
        >
          Liên hệ làm việc
          <IconSend className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
