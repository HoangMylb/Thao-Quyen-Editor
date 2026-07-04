'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteData } from '@/context/SiteDataContext';
import ProjectCard from '@/components/ProjectCard';
import CategoryCard from '@/components/CategoryCard';
import BlogCard from '@/components/BlogCard';
import EmptyState from '@/components/EmptyState';
import SectionLoading from '@/components/SectionLoading';
import VideoEmbed from '@/components/VideoEmbed';
import {
  IconArrowRight,
  IconClock,
  IconChecklist,
  IconMessageChatbot,
  IconSparkles,
  IconSend,
  IconX
} from '@tabler/icons-react';

export default function HomePage() {
  const { projects, categories, posts, profile, projectsLoading, categoriesLoading, postsLoading, profileLoading } = useSiteData();

  // Video Popup State
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string | null>(null);

  // Get Featured Projects based on Admin settings, fall back to first 3 is_featured projects
  const featuredIds = Array.from(new Set((profile?.homepage_featured_project_ids || []).map((id) => id.toLowerCase())));
  const featuredProjects = featuredIds.length > 0
    ? (featuredIds.map(id => projects.find(p => p.id.toLowerCase() === id)).filter(Boolean) as typeof projects).filter(p => p.is_published)
    : projects.filter((p) => p.is_featured && p.is_published).slice(0, 3);

  // Get categories configured by Admin
  const homeCategoryIds = Array.from(new Set((profile?.homepage_category_ids || []).map((id) => id.toLowerCase())));
  const homeCategories = homeCategoryIds.length > 0
    ? (homeCategoryIds.map(id => categories.find(c => c.id.toLowerCase() === id)).filter(Boolean) as typeof categories)
    : categories;

  // Get Latest 3 Blog posts that are published
  const latestPosts = posts
    .filter((p) => p.status === 'published')
    .slice(0, 3);

  // Helper to count projects in a category
  const getProjectCount = (categoryId: string) => {
    return projects.filter((p) => p.category_id.toLowerCase() === categoryId.toLowerCase() && p.is_published).length;
  };

  const steps = [
    {
      icon: <IconMessageChatbot className="w-6 h-6 text-primary" />,
      title: "1. Trao đổi & Lên ý tưởng",
      desc: "Thảo luận về mục tiêu truyền thông, đối tượng người xem, thời lượng và thông điệp cốt lõi của video."
    },
    {
      icon: <IconChecklist className="w-6 h-6 text-primary" />,
      title: "2. Tiếp nhận Source & Biên tập thô",
      desc: "Phân loại các cảnh quay, lựa chọn nhạc nền (BGM) phù hợp và ráp nối sườn nội dung cơ bản."
    },
    {
      icon: <IconSparkles className="w-6 h-6 text-primary" />,
      title: "3. Sound Design & VFX",
      desc: "Thêm hiệu ứng âm thanh sống động, chèn phụ đề (subtitles), zoom chuyển cảnh và hiệu chỉnh màu sắc sáng tạo."
    },
    {
      icon: <IconClock className="w-6 h-6 text-primary" />,
      title: "4. Duyệt & Bàn giao",
      desc: "Khách hàng duyệt bản nháp, chỉnh sửa tối đa 2 lần để cho ra sản phẩm hoàn thiện nhất với định dạng tối ưu."
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      {profile?.show_hero !== false && (
        <section className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden">
          {/* Custom background assets based on Admin selections */}
          {profile?.hero_bg_type === 'image' && profile?.hero_bg_url ? (
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.hero_bg_url} alt="" className="w-full h-full object-cover opacity-15" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
            </div>
          ) : profile?.hero_bg_type === 'video' && profile?.hero_bg_url ? (
            <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
              {profile.hero_bg_url.includes('youtube.com') || profile.hero_bg_url.includes('youtu.be') ? (
                <div className="w-full h-full opacity-15 scale-110">
                  <iframe
                    src={`${profile.hero_bg_url.includes('embed') ? profile.hero_bg_url : 'https://www.youtube.com/embed/' + (profile.hero_bg_url.split('v=')[1] || '')}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=${profile.hero_bg_url.split('v=')[1] || ''}`}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media"
                  />
                </div>
              ) : (
                <video src={profile.hero_bg_url} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-15" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
            </div>
          ) : (
            <>
              {/* Animated ambient glow backgrounds */}
              <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
              <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"></div>
            </>
          )}

          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 relative z-10 space-y-8">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-border bg-primary-light text-primary text-xs font-semibold tracking-wider uppercase shadow-sm">
              <IconSparkles className="w-3.5 h-3.5" />
              Video Editor & Creator
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-none">
              {profile?.headline || 'Creative Video Editor for Brands, Creators & Businesses'}
            </h1>

            {/* Subtext */}
            <p className="mx-auto max-w-2xl text-base text-slate-600 leading-relaxed">
              {profile?.short_bio || 'Dựng video quảng cáo, short-form content, Reels, TikTok, video bán hàng, video cá nhân & thương hiệu.'}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/portfolio"
                className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-500 hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                Xem dự án
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-slate-200 bg-slate-100 px-8 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-200 active:scale-95 transition-all"
              >
                Liên hệ hợp tác
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 2. FEATURED PROJECTS SECTION */}
      {(profileLoading || profile?.show_featured !== false) && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {profile?.featured_title || 'Dự án nổi bật'}
              </h2>
              <p className="text-sm text-slate-500 max-w-md">Một số video tiêu biểu được đầu tư kỹ lưỡng về hình ảnh, âm thanh và hiệu ứng định dạng dọc 9:16.</p>
            </div>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-emerald-600 transition-colors"
            >
              Tất cả dự án
              <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {projectsLoading || categoriesLoading ? (
            <SectionLoading title="Đang tải dự án nổi bật..." lines={3} />
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => {
                const cat = categories.find((c) => c.id.toLowerCase() === project.category_id.toLowerCase());
                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    categoryName={cat?.name}
                    onPlay={(url, title) => {
                      setActiveVideoUrl(url);
                      setActiveVideoTitle(title);
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="Chưa có dự án nổi bật"
              message="Hãy truy cập trang quản trị admin để thêm dự án mới và đánh dấu nổi bật."
            />
          )}
        </section>
      )}

      {/* 3. CATEGORIES SECTION */}
      {(profileLoading || profile?.show_categories !== false) && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {profile?.categories_title || 'Lĩnh vực sản xuất'}
            </h2>
            <p className="text-sm text-slate-500 max-w-md">Các định dạng video Thảo Quyên thường xuyên hỗ trợ khách hàng biên tập và tối ưu hóa nội dung.</p>
          </div>

          {categoriesLoading || projectsLoading ? (
            <SectionLoading title="Đang tải danh mục video..." lines={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {homeCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  projectCount={getProjectCount(category.id)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* 4. WORKFLOW PROCESS */}
      {profile?.show_workflow !== false && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Quy trình làm việc</h2>
            <p className="text-sm text-slate-500 max-w-md">Cách thức hợp tác nhanh gọn, bài bản để cho ra những thước phim chuẩn chỉnh.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="border border-card-border bg-card-bg p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light border border-primary-border">
                  {step.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. LATEST BLOGS */}
      {(profileLoading || profile?.show_blogs !== false) && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {profile?.blogs_title || 'Bài viết mới nhất'}
              </h2>
              <p className="text-sm text-slate-500 max-w-md">Kinh nghiệm dựng video, case study dự án và cập nhật xu hướng video marketing ngắn.</p>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-emerald-600 transition-colors"
            >
              Tất cả bài viết
              <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {postsLoading ? (
            <SectionLoading title="Đang tải bài viết mới nhất..." lines={3} />
          ) : latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Chưa có bài viết mới"
              message="Các bài viết chia sẻ kinh nghiệm biên tập video sẽ sớm được đăng tải tại đây."
            />
          )}
        </section>
      )}

      {/* 6. CONTACT CTA */}
      {profile?.show_contact !== false && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-card-border bg-gradient-to-br from-primary-light via-accent-light to-background px-6 py-16 text-center sm:px-12 sm:py-20 shadow-md">
            {/* Light lines decoration */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="relative z-10 mx-auto max-w-2xl space-y-6">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight leading-tight">
                Sẵn sàng nâng tầm thương hiệu <br className="hidden sm:inline" /> của bạn bằng những thước phim triệu view?
              </h2>
              <p className="text-sm mx-auto leading-relaxed text-slate-600">
                Hãy chia sẻ thông tin về sản phẩm, định hướng kênh và mục tiêu truyền thông để nhận tư vấn dựng video mẫu phù hợp nhất.
              </p>
              <div className="pt-4 flex justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white hover:bg-emerald-500 hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  Trao đổi dự án video của bạn
                  <IconSend className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* VERTICAL VIDEO POPUP MODAL */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer transition-opacity duration-300"
            onClick={() => {
              setActiveVideoUrl(null);
              setActiveVideoTitle(null);
            }}
          />

          {/* Vertical Modal Body */}
          <div className="relative z-10 w-full max-w-[380px] bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            {/* Header Toolbar */}
            <div className="w-full flex items-center justify-between px-5 py-3.5 bg-black/40 border-b border-white/5 text-white">
              <h4 className="text-xs font-bold truncate pr-6 font-sans tracking-wide uppercase">{activeVideoTitle || "Xem Video"}</h4>
              <button
                onClick={() => {
                  setActiveVideoUrl(null);
                  setActiveVideoTitle(null);
                }}
                className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors hover:bg-white/5 cursor-pointer"
                aria-label="Đóng"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            {/* Vertical aspect 9:16 player container */}
            <div className="w-full aspect-[9/16] bg-black relative flex items-center justify-center max-h-[75vh] overflow-hidden">
              <VideoEmbed videoUrl={activeVideoUrl} title={activeVideoTitle || "Project Video"} isVertical={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
