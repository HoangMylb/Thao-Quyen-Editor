'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMockDb } from '@/context/MockDbContext';
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconArticle
} from '@tabler/icons-react';

export default function AdminPostsPage() {
  const { posts, deletePost } = useMockDb();
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}" không?`)) {
      deletePost(id);
    }
  };

  // Filter posts
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Quản lý Blog Posts</h1>
          <p className="text-xs text-slate-550 text-slate-555 text-slate-500">Viết bài mới, quản lý bản nháp và biên tập các nội dung chia sẻ kinh nghiệm.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-all self-start shadow-sm"
        >
          <IconPlus className="w-4 h-4" />
          Viết Bài Mới
        </Link>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white border border-card-border p-4 rounded-2xl shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <IconSearch className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Grid of posts */}
      <div className="border border-card-border bg-white rounded-2xl overflow-hidden shadow-sm">
        {filteredPosts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-card-border bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="p-4">Bài viết</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4">Ngày cập nhật</th>
                  <th className="p-4 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Cover + Name */}
                    <td className="p-4">
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
                          <h4 className="font-semibold text-slate-900 text-sm line-clamp-1">{post.title}</h4>
                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{post.excerpt}</p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      {post.status === 'published' ? (
                        <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                          Public
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Draft
                        </span>
                      )}
                    </td>

                    {/* Updated At */}
                    <td className="p-4 font-mono text-slate-500">
                      {new Date(post.updated_at).toLocaleDateString('vi-VN')}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="p-1.5 text-slate-500 hover:text-primary bg-slate-50 border border-slate-200 rounded-lg transition-colors"
                          title="Sửa bài viết"
                        >
                          <IconEdit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-1.5 text-slate-500 hover:text-red-650 bg-slate-50 border border-slate-200 rounded-lg transition-colors"
                          title="Xóa bài viết"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 text-xs">
            <IconArticle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            Không tìm thấy bài viết nào phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}
