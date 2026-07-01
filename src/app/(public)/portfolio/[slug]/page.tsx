'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSiteData } from '@/context/SiteDataContext';
import VideoEmbed from '@/components/VideoEmbed';
import ProjectCard from '@/components/ProjectCard';
import {
  IconChevronLeft,
  IconUser,
  IconCalendar,
  IconTool,
  IconBriefcase,
  IconTarget,
  IconSend
} from '@tabler/icons-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { projects, categories } = useSiteData();

  const project = projects.find((p) => p.slug.toLowerCase() === resolvedParams.slug.toLowerCase() && p.is_published);

  if (!project) {
    return (
      <div className="mx-auto max-w-xl text-center py-24 px-4">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Không tìm thấy dự án</h2>
        <p className="text-sm text-slate-500 mb-6">Dự án này không tồn tại hoặc đã được gỡ bỏ khỏi chế độ hiển thị công khai.</p>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
        >
          Quay lại portfolio
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id.toLowerCase() === project.category_id.toLowerCase());

  // Get related projects from the same category
  const relatedProjects = projects
    .filter((p) => p.category_id.toLowerCase() === project.category_id.toLowerCase() && p.id.toLowerCase() !== project.id.toLowerCase() && p.is_published)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors font-semibold"
        >
          <IconChevronLeft className="w-4 h-4" />
          Quay lại trang trước
        </button>
      </div>

      {/* Title & Category Row */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 uppercase tracking-wider"
            >
              {category.name}
            </Link>
          )}
          {project.is_featured && (
            <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Dự án nổi bật
            </span>
          )}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
          {project.title}
        </h1>
      </div>

      {/* Main Grid: Video + Meta Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Video Embed & Details */}
        <div className="lg:col-span-2 space-y-8">
          <VideoEmbed videoUrl={project.video_url} title={project.title} />
          
          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 border-b border-card-border pb-2">Chi tiết dự án</h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>
        </div>

        {/* Right Column: Specifications & Meta Info Cards */}
        <div className="space-y-6">
          <div className="border border-card-border bg-white shadow-sm p-6 rounded-2xl space-y-6">
            <h3 className="text-base font-bold text-slate-900 tracking-wide uppercase border-b border-card-border pb-3">Thông tin dự án</h3>
            
            {/* Spec items */}
            <div className="space-y-4 text-xs">
              {project.client_name && (
                <div className="flex items-start gap-3">
                  <IconUser className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-500 font-semibold mb-0.5">Khách hàng</h4>
                    <p className="text-slate-800 text-sm">{project.client_name}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <IconCalendar className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <div>
                  <h4 className="text-slate-500 font-semibold mb-0.5">Ngày thực hiện</h4>
                  <p className="text-slate-800 text-sm">{project.project_date}</p>
                </div>
              </div>

              {project.editor_role && (
                <div className="flex items-start gap-3">
                  <IconBriefcase className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-500 font-semibold mb-0.5">Vai trò sản xuất</h4>
                    <p className="text-slate-800 text-sm leading-relaxed">{project.editor_role}</p>
                  </div>
                </div>
              )}

              {project.project_goals && (
                <div className="flex items-start gap-3">
                  <IconTarget className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-500 font-semibold mb-0.5">Mục tiêu dự án</h4>
                    <p className="text-slate-800 text-sm leading-relaxed">{project.project_goals}</p>
                  </div>
                </div>
              )}

              {project.tools_used && project.tools_used.length > 0 && (
                <div className="flex items-start gap-3">
                  <IconTool className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-500 font-semibold mb-0.5">Công cụ sử dụng</h4>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {project.tools_used.map((tool) => (
                        <span key={tool} className="rounded bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] font-mono text-slate-650 text-slate-600">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Box */}
          <div className="border border-emerald-100 bg-emerald-50/50 p-6 rounded-2xl text-center space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Bạn muốn sở hữu video tương tự?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thảo Quyên hỗ trợ biên tập nội dung, phân màu chuyên nghiệp và sound design phù hợp với định hướng thương hiệu của bạn.
            </p>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm"
            >
              Liên hệ làm video
              <IconSend className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-card-border">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Dự án liên quan</h3>
            <p className="text-xs text-slate-500">Các sản phẩm cùng danh mục thực hiện bởi Thảo Quyên.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                categoryName={category?.name}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
