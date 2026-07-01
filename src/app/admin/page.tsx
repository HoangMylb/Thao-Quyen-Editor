'use client';

import Link from 'next/link';
import { useMockDb } from '@/context/MockDbContext';
import {
  IconVideo,
  IconCategory,
  IconArticle,
  IconPlus,
  IconEdit
} from '@tabler/icons-react';

export default function AdminDashboardPage() {
  const { projects, categories, posts, profile } = useMockDb();

  // Metrics
  const totalProjects = projects.length;
  const totalCategories = categories.length;
  const totalPosts = posts.length;
  const featuredProjectsCount = projects.filter((p) => p.is_featured).length;
  const publishedPostsCount = posts.filter((p) => p.status === 'published').length;
  const draftPostsCount = totalPosts - publishedPostsCount;

  // Recents (last 3 sorted by created/updated date)
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 3);

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 3);

  const stats = [
    {
      label: 'Tổng Video Projects',
      value: totalProjects,
      desc: `${featuredProjectsCount} dự án nổi bật`,
      icon: <IconVideo className="w-6 h-6 text-emerald-600" />,
      color: 'bg-emerald-50 border-emerald-250 bg-emerald-50 border-emerald-200'
    },
    {
      label: 'Tổng Categories',
      value: totalCategories,
      desc: 'Danh mục phân loại video',
      icon: <IconCategory className="w-6 h-6 text-sky-600" />,
      color: 'bg-sky-50 border-sky-250 bg-sky-50 border-sky-200'
    },
    {
      label: 'Bài viết Blog',
      value: totalPosts,
      desc: `${publishedPostsCount} xuất bản, ${draftPostsCount} nháp`,
      icon: <IconArticle className="w-6 h-6 text-teal-600" />,
      color: 'bg-teal-50 border-teal-250 bg-teal-50 border-teal-200'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">Dashboard Tổng quan</h1>
          <p className="text-xs text-slate-550 text-slate-500">Xin chào, {profile?.full_name || 'Thảo Quyên'}. Chào mừng quay trở lại trang quản trị.</p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 shadow-sm"
          >
            <IconPlus className="w-4 h-4" />
            Thêm Project
          </Link>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-205 hover:bg-slate-200 shadow-sm"
          >
            <IconPlus className="w-4 h-4" />
            Viết Blog
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`border p-6 rounded-2xl flex items-center justify-between bg-white border-card-border shadow-sm`}>
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{stat.label}</span>
              <div className="text-3xl font-extrabold text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-500">{stat.desc}</p>
            </div>
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Lists split screen */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="border border-card-border bg-white shadow-sm p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-card-border pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <IconVideo className="w-5 h-5 text-primary" />
              Project mới cập nhật
            </h3>
            <Link href="/admin/projects" className="text-xs text-primary hover:underline font-semibold">
              Tất cả
            </Link>
          </div>

          <div className="divide-y divide-card-border">
            {recentProjects.map((proj) => (
              <div key={proj.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                    {proj.video_url && !proj.video_url.includes('youtube.com') && !proj.video_url.includes('youtu.be') && !proj.video_url.includes('vimeo.com') ? (
                      <video src={proj.video_url} muted className="h-full w-full object-cover" />
                    ) : (
                      <img 
                        src={proj.video_url && (proj.video_url.includes('youtube.com') || proj.video_url.includes('youtu.be'))
                          ? `https://img.youtube.com/vi/${proj.video_url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)?.[2] || ''}/0.jpg`
                          : proj.thumbnail_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'} 
                        alt="" 
                        className="h-full w-full object-cover" 
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{proj.title}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{proj.project_date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {proj.is_featured && (
                    <span className="text-[9px] font-bold text-white bg-primary px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                  {proj.is_published ? (
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">
                      Active
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-slate-550 text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 uppercase tracking-wider">
                      Draft
                    </span>
                  )}
                  <Link
                    href={`/admin/projects/${proj.id}/edit`}
                    className="p-1.5 text-slate-500 hover:text-primary bg-slate-100 border border-slate-250 border-slate-200 rounded-lg transition-colors"
                  >
                    <IconEdit className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="border border-card-border bg-white shadow-sm p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-card-border pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <IconArticle className="w-5 h-5 text-primary" />
              Blog mới đăng gần đây
            </h3>
            <Link href="/admin/posts" className="text-xs text-primary hover:underline font-semibold">
              Tất cả
            </Link>
          </div>

          <div className="divide-y divide-card-border">
            {recentPosts.map((post) => (
              <div key={post.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                    {post.thumbnail_url && (post.thumbnail_url.startsWith('data:video/') || post.thumbnail_url.includes('.mp4') || post.thumbnail_url.includes('video')) ? (
                      <video src={post.thumbnail_url} muted className="h-full w-full object-cover" />
                    ) : (
                      <img 
                        src={post.thumbnail_url && (post.thumbnail_url.includes('youtube.com') || post.thumbnail_url.includes('youtu.be'))
                          ? `https://img.youtube.com/vi/${post.thumbnail_url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)?.[2] || ''}/0.jpg`
                          : post.thumbnail_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'} 
                        alt="" 
                        className="h-full w-full object-cover" 
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{post.title}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(post.updated_at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {post.status === 'published' ? (
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">
                      Public
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-slate-550 text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 uppercase tracking-wider">
                      Draft
                    </span>
                  )}
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="p-1.5 text-slate-500 hover:text-primary bg-slate-100 border border-slate-250 border-slate-200 rounded-lg transition-colors"
                  >
                    <IconEdit className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
