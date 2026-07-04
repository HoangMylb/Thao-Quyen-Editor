'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSiteData } from '@/context/SiteDataContext';
import { uploadVideo } from '@/lib/api';
import { Project } from '@/lib/types';
import { generateSlug } from '@/lib/slugify';
import { IconChevronLeft, IconVideo } from '@tabler/icons-react';

interface ProjectFormProps {
  project?: Project; // If editing
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const { categories, addProject, updateProject } = useSiteData();

  const [title, setTitle] = useState(project?.title || '');
  const [slug, setSlug] = useState(project?.slug || '');
  const [shortDescription, setShortDescription] = useState(project?.short_description || '');
  const [description, setDescription] = useState(project?.description || '');
  const thumbnailUrl = project?.thumbnail_url || '';
  const [videoUrl, setVideoUrl] = useState(project?.video_url || '');
  const [localVideoPreviewUrl, setLocalVideoPreviewUrl] = useState('');
  const [localVideoName, setLocalVideoName] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [categoryId, setCategoryId] = useState(project?.category_id || categories[0]?.id || '');
  const [clientName, setClientName] = useState(project?.client_name || '');
  const [toolsInput, setToolsInput] = useState(project?.tools_used?.join(', ') || '');
  const [projectGoals, setProjectGoals] = useState(project?.project_goals || '');
  const [editorRole, setEditorRole] = useState(project?.editor_role || '');
  const [isFeatured, setIsFeatured] = useState(project?.is_featured || false);
  const [projectDate, setProjectDate] = useState(project?.project_date || new Date().toISOString().split('T')[0]);

  useEffect(() => () => {
    if (localVideoPreviewUrl) {
      URL.revokeObjectURL(localVideoPreviewUrl);
    }
  }, [localVideoPreviewUrl]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !categoryId) return;

    let resolvedVideoUrl = videoUrl.trim();

    if (videoFile) {
      setIsUploadingVideo(true);
      try {
        const uploaded = await uploadVideo(videoFile, 'projects');
        resolvedVideoUrl = uploaded.url;
        setVideoUrl(uploaded.url);
      } finally {
        setIsUploadingVideo(false);
      }
    }

    if (!resolvedVideoUrl) return;

    // Parse toolsInput from comma separated to array
    const tools_used = toolsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t !== '');

    const projectData = {
      title,
      slug,
      short_description: shortDescription,
      description,
      thumbnail_url: thumbnailUrl || resolvedVideoUrl,
      video_url: resolvedVideoUrl,
      category_id: categoryId,
      client_name: clientName,
      tools_used,
      project_goals: projectGoals,
      editor_role: editorRole,
      is_featured: isFeatured,
      is_published: true,
      project_date: projectDate
    };

    try {
      if (project) {
        await updateProject(project.id, projectData);
      } else {
        await addProject(projectData);
      }
      router.push('/admin/projects');
    } catch (err: unknown) {
      const error = err as Error;
      alert(error.message || 'Lỗi khi lưu dữ liệu.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary font-semibold"
        >
          <IconChevronLeft className="w-4 h-4" />
          Quay lại danh sách
        </button>
      </div>

      <div className="border border-card-border bg-white shadow-sm p-6 rounded-2xl space-y-6">
        <div className="flex items-center gap-2 border-b border-card-border pb-3">
          <IconVideo className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">
            {project ? 'Cập nhật thông tin Project' : 'Khởi tạo Project Mới'}
          </h3>
        </div>

        {/* Layout Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-600">Tiêu đề Project *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Nhập tên dự án video..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Danh mục phân loại *</label>
            <select
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-800 focus:border-primary/50 focus:outline-none cursor-pointer focus:bg-white"
            >
              <option value="" disabled>Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Client Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Tên khách hàng / Nhãn hàng</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="GlowSkin, FlexWear, etc."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
            />
          </div>

          {/* Video URL & Direct Upload */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-600">Video Dự án (dán URL hoặc chọn file từ máy) *</label>
            <div className="flex gap-2">
                <input
                  type="text"
                  required={!videoFile}
                  value={videoUrl}
                  onChange={(e) => {
                    setVideoUrl(e.target.value);
                    setVideoFile(null);
                    setLocalVideoName('');
                    if (localVideoPreviewUrl) {
                      URL.revokeObjectURL(localVideoPreviewUrl);
                      setLocalVideoPreviewUrl('');
                    }
                  }}
                  onInvalid={(e) => {
                    if (!videoFile) {
                      e.currentTarget.setCustomValidity('Hãy nhập URL video hoặc chọn file video để tải lên.');
                    } else {
                      e.currentTarget.setCustomValidity('');
                    }
                  }}
                  onInput={(e) => e.currentTarget.setCustomValidity('')}
                  placeholder="Dán link video public hoặc để trống nếu bạn chọn file từ máy"
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

                    if (localVideoPreviewUrl) {
                      URL.revokeObjectURL(localVideoPreviewUrl);
                    }

                    const nextPreviewUrl = URL.createObjectURL(file);
                    setLocalVideoPreviewUrl(nextPreviewUrl);
                    setLocalVideoName(file.name);
                    setVideoFile(file);
                    setVideoUrl('');
                  }}
                />
              </label>
            </div>
            {localVideoName && (
              <p className="text-[11px] text-amber-700">
                Đã chọn file từ máy: {localVideoName}. Không cần nhập thêm link. File sẽ được upload khi bấm lưu.
              </p>
            )}
            {videoUrl && (
              <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 max-w-xs">
                <span className="text-[10px] font-semibold text-slate-400 block mb-1">Xem trước video:</span>
                {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={videoUrl.replace('watch?v=', 'embed/')}
                    className="w-full aspect-[9/16] rounded-lg border border-slate-200"
                    allowFullScreen
                  />
                ) : (
                  <video src={videoUrl} controls className="w-full aspect-[9/16] rounded-lg border border-slate-200 object-cover" />
                )}
              </div>
            )}
            {!videoUrl && localVideoPreviewUrl && (
              <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 max-w-xs">
                <span className="text-[10px] font-semibold text-slate-400 block mb-1">Xem trước video từ máy:</span>
                <video src={localVideoPreviewUrl} controls className="w-full aspect-[9/16] rounded-lg border border-slate-200 object-cover" />
              </div>
            )}
          </div>

          {/* Project Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Ngày thực hiện *</label>
            <input
              type="date"
              required
              value={projectDate}
              onChange={(e) => setProjectDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-800 focus:border-primary/50 focus:outline-none focus:bg-white transition-all cursor-pointer"
            />
          </div>

          {/* Tools Used */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Công cụ (các công cụ cách nhau bởi dấu phẩy)</label>
            <input
              type="text"
              value={toolsInput}
              onChange={(e) => setToolsInput(e.target.value)}
              placeholder="Premiere Pro, After Effects, CapCut, Audition"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Roles & Goals */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Vai trò của Thảo Quyên trong dự án</label>
            <input
              type="text"
              value={editorRole}
              onChange={(e) => setEditorRole(e.target.value)}
              placeholder="Lead Editor, Colorist, Sound Designer, VFX Editor..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Mục tiêu của dự án (Goals)</label>
            <input
              type="text"
              value={projectGoals}
              onChange={(e) => setProjectGoals(e.target.value)}
              placeholder="Tăng doanh số, xây dựng branding, thu hút 100k view..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Mô tả ngắn (Hiển thị ở trang danh sách) *</label>
            <input
              type="text"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Nhập mô tả ngắn gọn khoảng 1-2 câu..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Mô tả đầy đủ chi tiết</label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập thông tin chi tiết về sản phẩm, quá trình lên ý tưởng, hậu kỳ..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all resize-none"
            />
          </div>
        </div>

        {/* Options Row */}
        <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-card-border">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-slate-300 bg-slate-50 text-emerald-600 focus:ring-0 focus:ring-offset-0"
            />
            Dự án nổi bật (Featured)
          </label>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4 border-t border-card-border">
          <button
            type="button"
            onClick={() => router.push('/admin/projects')}
            className="rounded-xl border border-slate-200 bg-slate-100 px-6 py-2.5 text-xs font-semibold text-slate-800 transition-all hover:bg-slate-200"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            disabled={isUploadingVideo}
            className="rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-all shadow-sm"
          >
            {isUploadingVideo ? 'Đang upload video...' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>
    </form>
  );
}
