'use client';

import { useMockDb } from '@/context/MockDbContext';
import BlogCard from '@/components/BlogCard';
import EmptyState from '@/components/EmptyState';

export default function BlogPage() {
  const { posts } = useMockDb();

  // Only show published articles
  const publishedPosts = posts.filter((p) => p.status === 'published');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Góc Chia Sẻ</h1>
        <p className="text-sm text-slate-605 leading-relaxed text-slate-600">
          Nơi cập nhật kinh nghiệm làm việc, kỹ năng hậu kỳ, tư duy biên kịch hình ảnh và các xu hướng video ngắn mới nhất.
        </p>
      </div>

      {/* Blog Cards Grid */}
      {publishedPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Chưa có bài viết công khai"
          message="Các bài viết chia sẻ kiến thức đang được chuẩn bị và sẽ sớm được đăng tải."
        />
      )}
    </div>
  );
}
