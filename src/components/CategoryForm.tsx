'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSiteData } from '@/context/SiteDataContext';
import { Category } from '@/lib/types';
import { generateSlug } from '@/lib/slugify';
import { IconChevronLeft, IconCategory } from '@tabler/icons-react';

interface CategoryFormProps {
  category?: Category; // If editing
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const { addCategory, updateCategory } = useSiteData();

  const [name, setName] = useState(category?.name || '');
  const [slug, setSlug] = useState(category?.slug || '');
  const [description, setDescription] = useState(category?.description || '');

  const handleNameChange = (newName: string) => {
    setName(newName);
    if (!category) {
      setSlug(generateSlug(newName));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    const catData = {
      name,
      slug,
      description,
      thumbnail_url: ''
    };

    try {
      if (category) {
        await updateCategory(category.id, catData);
      } else {
        await addCategory(catData);
      }
      router.push('/admin/categories');
    } catch (err: unknown) {
      const error = err as Error;
      alert(error.message || 'Lỗi khi lưu danh mục.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back Link */}
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary font-semibold"
        >
          <IconChevronLeft className="w-4 h-4" />
          Quay lại danh mục
        </button>
      </div>

      {/* Form Container */}
      <div className="border border-card-border bg-white shadow-sm p-6 rounded-2xl space-y-6">
        <div className="flex items-center gap-2 border-b border-card-border pb-3">
          <IconCategory className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">
            {category ? 'Chỉnh sửa Danh Mục' : 'Khởi tạo Danh Mục Mới'}
          </h3>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Tên danh mục *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="TikTok / Reels / Shorts..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Slug (URL hiển thị) *</label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              placeholder="tiktok-reels-shorts"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
            />
          </div>



          {/* Description */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-600">Mô tả ngắn gọn</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả tóm tắt tính chất thể loại video..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-card-border">
          <button
            type="button"
            onClick={() => router.push('/admin/categories')}
            className="rounded-xl border border-slate-205 border-slate-200 bg-slate-100 px-6 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-200 transition-all"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-all shadow-sm"
          >
            Lưu danh mục
          </button>
        </div>
      </div>
    </form>
  );
}
