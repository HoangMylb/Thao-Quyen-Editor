'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteData } from '@/context/SiteDataContext';
import SectionLoading from '@/components/SectionLoading';
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconCategory
} from '@tabler/icons-react';

export default function AdminCategoriesPage() {
  const { categories, projects, deleteCategory, categoriesLoading, projectsLoading } = useSiteData();
  const [searchQuery, setSearchQuery] = useState('');

  const getProjectCount = (catId: string) => {
    return projects.filter((p) => p.category_id.toLowerCase() === catId.toLowerCase()).length;
  };

  const handleDelete = async (id: string, name: string) => {
    const count = getProjectCount(id);
    if (count > 0) {
      alert(`Không thể xóa danh mục "${name}" vì có ${count} dự án đang thuộc danh mục này. Hãy đổi danh mục cho các dự án đó trước.`);
      return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa danh mục "${name}" không?`)) {
      try {
        await deleteCategory(id);
      } catch (err: unknown) {
        const error = err as Error;
        alert(error.message || 'Lỗi khi xóa danh mục.');
      }
    }
  };

  // Filter categories
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Quản lý Categories</h1>
          <p className="text-xs text-slate-500">Xem, tạo mới và tinh chỉnh các danh mục để phân loại video.</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-all self-start shadow-sm"
        >
          <IconPlus className="w-4 h-4" />
          Thêm Category Mới
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
            placeholder="Tìm kiếm danh mục..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Grid of Categories */}
      {categoriesLoading || projectsLoading ? (
        <SectionLoading title="Đang tải danh mục quản trị..." lines={4} />
      ) : filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            const projCount = getProjectCount(cat.id);
            return (
              <div
                key={cat.id}
                className="group border border-card-border bg-white rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm p-6 space-y-4"
              >
                {/* Content */}
                <div className="flex-1 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 leading-tight">{cat.name}</h3>
                    <span className="rounded-full bg-primary-light border border-primary-border px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase font-mono shadow-sm">
                      {projCount} projects
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{cat.description || 'Không có mô tả.'}</p>
                  <div className="text-[10px] text-slate-400 font-mono">Slug: {cat.slug}</div>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-card-border flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/categories/${cat.id}/edit`}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 hover:border-primary/20 hover:bg-primary/5 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all"
                  >
                    <IconEdit className="w-3.5 h-3.5" />
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 hover:border-red-200 hover:bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-all cursor-pointer"
                  >
                    <IconTrash className="w-3.5 h-3.5" />
                    Xóa
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border border-card-border bg-white shadow-sm p-12 rounded-2xl text-center text-slate-500 text-xs">
          <IconCategory className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          Không tìm thấy danh mục nào phù hợp.
        </div>
      )}
    </div>
  );
}
