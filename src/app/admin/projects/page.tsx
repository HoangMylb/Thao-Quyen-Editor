'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteData } from '@/context/SiteDataContext';
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconVideo,
  IconStar
} from '@tabler/icons-react';

export default function AdminProjectsPage() {
  const { projects, categories, deleteProject, updateProject } = useSiteData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa dự án "${title}" không?`)) {
      await deleteProject(id);
    }
  };

  const toggleFeatured = async (id: string, currentVal: boolean) => {
    await updateProject(id, { is_featured: !currentVal });
  };

  const togglePublished = async (id: string, currentVal: boolean) => {
    await updateProject(id, { is_published: !currentVal });
  };

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Quản lý Video Projects</h1>
          <p className="text-xs text-slate-500">Xem, tạo mới, cập nhật thông tin và cài đặt hiển thị các video portfolio.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-all self-start shadow-sm"
        >
          <IconPlus className="w-4 h-4" />
          Thêm Project Mới
        </Link>
      </div>

      {/* Filter panel */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white border border-card-border p-4 rounded-2xl shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <IconSearch className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm dự án..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-colors"
          />
        </div>

        {/* Categories select */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-primary/50 focus:outline-none focus:bg-white cursor-pointer shadow-sm"
        >
          <option value="all">Tất cả danh mục</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table grid */}
      <div className="border border-card-border bg-white rounded-2xl overflow-hidden shadow-sm">
        {filteredProjects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-card-border bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="p-4">Dự án</th>
                  <th className="p-4">Danh mục</th>
                  <th className="p-4">Ngày chạy</th>
                  <th className="p-4 text-center">Nổi bật</th>
                  <th className="p-4 text-center">Hiển thị</th>
                  <th className="p-4 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                {filteredProjects.map((proj) => {
                  const cat = categories.find((c) => c.id === proj.category_id);
                  return (
                    <tr key={proj.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Name & Thumbnail */}
                      <td className="p-4">
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
                            <h4 className="font-semibold text-slate-900 text-sm line-clamp-1">{proj.title}</h4>
                            <span className="text-[10px] text-slate-500 font-mono line-clamp-1">{proj.client_name || 'No Client'}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 uppercase">
                          {cat?.name || 'Unassigned'}
                        </span>
                      </td>

                      {/* Project date */}
                      <td className="p-4 font-mono text-slate-500">
                        {proj.project_date}
                      </td>

                      {/* Featured status toggle */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => toggleFeatured(proj.id, proj.is_featured)}
                          className={`inline-flex p-1.5 rounded-lg border transition-colors ${
                            proj.is_featured
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-105 hover:bg-emerald-100'
                              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                          }`}
                        >
                          <IconStar className="w-4 h-4" />
                        </button>
                      </td>

                      {/* Published status toggle */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => togglePublished(proj.id, proj.is_published)}
                          className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold border transition-colors uppercase ${
                            proj.is_published
                              ? 'bg-emerald-50 border-emerald-100 text-emerald-75 text-emerald-700'
                              : 'bg-slate-50 border-slate-200 text-slate-500'
                          }`}
                        >
                          {proj.is_published ? 'Public' : 'Draft'}
                        </button>
                      </td>

                      {/* Edit / Delete actions */}
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/projects/${proj.id}/edit`}
                            className="p-1.5 text-slate-500 hover:text-primary bg-slate-50 border border-slate-200 rounded-lg transition-colors"
                            title="Sửa dự án"
                          >
                            <IconEdit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(proj.id, proj.title)}
                            className="p-1.5 text-slate-500 hover:text-red-650 bg-slate-50 border border-slate-200 rounded-lg transition-colors"
                            title="Xóa dự án"
                          >
                            <IconTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 text-xs">
            <IconVideo className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            Không tìm thấy video dự án nào phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}
