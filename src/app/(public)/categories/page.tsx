'use client';

import { useMockDb } from '@/context/MockDbContext';
import CategoryCard from '@/components/CategoryCard';

export default function CategoriesPage() {
  const { categories, projects } = useMockDb();

  // Helper to count projects in a category
  const getProjectCount = (categoryId: string) => {
    return projects.filter((p) => p.category_id === categoryId && p.is_published).length;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Danh mục Video</h1>
        <p className="text-sm text-slate-650 leading-relaxed text-slate-650 text-slate-600">
          Phân loại các thể loại video giúp khách hàng dễ dàng tiếp cận với đúng định hướng phong cách thương hiệu mong muốn.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            projectCount={getProjectCount(category.id)}
          />
        ))}
      </div>
    </div>
  );
}
