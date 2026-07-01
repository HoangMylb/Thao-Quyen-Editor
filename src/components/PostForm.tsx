'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMockDb } from '@/context/MockDbContext';
import { Post } from '@/lib/mockDb';
import { generateSlug } from '@/lib/slugify';
import { IconChevronLeft, IconArticle } from '@tabler/icons-react';

interface PostFormProps {
  post?: Post; // If editing
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const { addPost, updatePost } = useMockDb();

  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [thumbnailUrl, setThumbnailUrl] = useState(post?.thumbnail_url || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormat = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const selectedText = text.substring(start, end);
    const replacement = prefix + selectedText + suffix;

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setContent(newContent);

    // Focus back and highlight selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) return;

    const postData = {
      title,
      slug,
      excerpt,
      content,
      thumbnail_url: thumbnailUrl,
      status: 'published' as 'draft' | 'published',
      published_at: post?.published_at || new Date().toISOString()
    };

    try {
      if (post) {
        updatePost(post.id, postData);
      } else {
        addPost(postData);
      }
      router.push('/admin/posts');
    } catch (err: unknown) {
      const error = err as Error;
      alert(error.message || 'Lỗi khi lưu bài viết.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary font-semibold"
        >
          <IconChevronLeft className="w-4 h-4" />
          Quay lại bài viết
        </button>
      </div>

      {/* Form Card */}
      <div className="border border-card-border bg-white shadow-sm p-6 rounded-2xl space-y-6">
        <div className="flex items-center gap-2 border-b border-card-border pb-3">
          <IconArticle className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">
            {post ? 'Chỉnh sửa Bài Viết' : 'Khởi tạo Bài Viết Mới'}
          </h3>
        </div>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-600">Tiêu đề bài viết *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Nhập tiêu đề bài viết..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
            />
          </div>

          {/* Video / Cover Clip & Direct Upload */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-600">Video / Cover Clip cho bài viết (URL hoặc Tải video lên) *</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://example.com/video.mp4 hoặc YouTube URL hoặc Dữ liệu file video"
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
              />
              <label className="inline-flex items-center justify-center rounded-xl border border-slate-200 hover:border-primary/50 hover:bg-slate-50 px-4 text-xs font-semibold text-slate-700 cursor-pointer transition-colors">
                Tải video lên
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        setThumbnailUrl(event.target.result as string);
                      }
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
            </div>
            {thumbnailUrl && (
              <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 max-w-xs">
                <span className="text-[10px] font-semibold text-slate-400 block mb-1">Xem trước video cover:</span>
                {thumbnailUrl.includes('youtube.com') || thumbnailUrl.includes('youtu.be') ? (
                  <iframe
                    src={thumbnailUrl.replace('watch?v=', 'embed/')}
                    className="w-full aspect-video rounded-lg border border-slate-200"
                    allowFullScreen
                  />
                ) : (
                  <video src={thumbnailUrl} controls className="w-full aspect-video rounded-lg border border-slate-200 object-cover" />
                )}
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-600">Tóm tắt ngắn (Excerpt) *</label>
            <input
              type="text"
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Nhập tóm tắt mô tả nội dung hiển thị ở trang danh sách..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
            />
          </div>

          {/* Rich Content Text Area with Markdown Helper Toolbar */}
          <div className="space-y-1.5 md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-600">Nội dung bài viết *</label>
              <span className="text-[10px] text-slate-400 font-mono">Soạn thảo văn bản nhanh</span>
            </div>

            {/* Formatting Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-100 rounded-t-xl border border-slate-200 border-b-0 select-none">
              <button
                type="button"
                onClick={() => insertFormat('## ', '\n')}
                className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-700 border border-slate-200 hover:border-primary hover:text-primary transition-all cursor-pointer"
              >
                Tiêu đề chính
              </button>
              <button
                type="button"
                onClick={() => insertFormat('### ', '\n')}
                className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-700 border border-slate-200 hover:border-primary hover:text-primary transition-all cursor-pointer"
              >
                Tiêu đề phụ
              </button>
              <button
                type="button"
                onClick={() => insertFormat('**', '**')}
                className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-bold text-slate-700 border border-slate-200 hover:border-primary hover:text-primary transition-all cursor-pointer"
              >
                Chữ đậm
              </button>
              <button
                type="button"
                onClick={() => insertFormat('*', '*')}
                className="rounded-lg bg-white px-2.5 py-1 text-[10px] italic text-slate-700 border border-slate-200 hover:border-primary hover:text-primary transition-all cursor-pointer"
              >
                Chữ nghiêng
              </button>
              <button
                type="button"
                onClick={() => insertFormat('- ', '\n')}
                className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-700 border border-slate-200 hover:border-primary hover:text-primary transition-all cursor-pointer"
              >
                Danh sách
              </button>
              <button
                type="button"
                onClick={() => insertFormat('> ', '\n')}
                className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-700 border border-slate-200 hover:border-primary hover:text-primary transition-all cursor-pointer"
              >
                Trích dẫn
              </button>
              <button
                type="button"
                onClick={() => insertFormat('[', '](link_lien_ket)')}
                className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-700 border border-slate-200 hover:border-primary hover:text-primary transition-all cursor-pointer"
              >
                Đường dẫn (Link)
              </button>
            </div>

            <textarea
              ref={textareaRef}
              required
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Viết bài viết chi tiết ở đây..."
              className="w-full rounded-b-xl rounded-t-none border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all resize-none font-mono"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-card-border">
          <button
            type="button"
            onClick={() => router.push('/admin/posts')}
            className="rounded-xl border border-slate-205 border-slate-200 bg-slate-100 px-6 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-200 transition-all"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-all shadow-sm"
          >
            Lưu bài viết
          </button>
        </div>
      </div>
    </form>
  );
}
