'use client';

import { useState } from 'react';
import { useSiteData } from '@/context/SiteDataContext';
import ProjectCard from '@/components/ProjectCard';
import EmptyState from '@/components/EmptyState';
import { IconSearch, IconAdjustmentsHorizontal } from '@tabler/icons-react';

export default function PortfolioPage() {
  const { projects, categories } = useSiteData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // newest | featured

  // Filter projects (only show published ones)
  const filteredProjects = projects
    .filter((p) => p.is_published)
    .filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.short_description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category_id === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'featured') {
        // Featured projects first, then sort by date
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
      }
      // Default: sort by project date descending
      return new Date(b.project_date).getTime() - new Date(a.project_date).getTime();
    });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Dự án Video</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Khám phá danh sách các video đã sản xuất và dựng bản mẫu. Sử dụng công cụ lọc để chọn lọc các định dạng video bạn quan tâm.
        </p>
      </div>

      {/* Search & Filters Panel */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between border-b border-card-border pb-8">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <IconSearch className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm dự án theo tên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-card-border bg-white text-sm text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none transition-colors shadow-sm"
          />
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <IconAdjustmentsHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-card-border bg-white px-3 py-2.5 text-xs text-slate-800 focus:border-primary/50 focus:outline-none cursor-pointer shadow-sm"
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-card-border bg-white px-3 py-2.5 text-xs text-slate-800 focus:border-primary/50 focus:outline-none cursor-pointer shadow-sm"
          >
            <option value="newest">Mới nhất</option>
            <option value="featured">Dự án nổi bật</option>
          </select>
        </div>
      </div>

      {/* Catalog Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const cat = categories.find((c) => c.id === project.category_id);
            return (
              <ProjectCard
                key={project.id}
                project={project}
                categoryName={cat?.name}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="Không tìm thấy video phù hợp"
          message="Vui lòng điều chỉnh từ khóa tìm kiếm hoặc đổi bộ lọc danh mục khác."
        />
      )}
    </div>
  );
}
