'use client';

import { useState } from 'react';
import { useSiteData } from '@/context/SiteDataContext';
import { IconSettings, IconCheck, IconUser } from '@tabler/icons-react';

export default function AdminSettingsPage() {
  const { profile, updateProfile, projects, categories } = useSiteData();

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [headline, setHeadline] = useState(profile?.headline || '');
  const [shortBio, setShortBio] = useState(profile?.short_bio || '');
  const [aboutContent, setAboutContent] = useState(profile?.about_content || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [zaloUrl, setZaloUrl] = useState(profile?.zalo_url || '');
  const [facebookUrl, setFacebookUrl] = useState(profile?.facebook_url || '');
  const [tiktokUrl, setTiktokUrl] = useState(profile?.tiktok_url || '');
  const [instagramUrl, setInstagramUrl] = useState(profile?.instagram_url || '');
  const [youtubeUrl, setYoutubeUrl] = useState(profile?.youtube_url || '');
  const [ctaText, setCtaText] = useState(profile?.cta_text || '');
  const [success, setSuccess] = useState(false);

  const [showHero, setShowHero] = useState(profile?.show_hero !== false);
  const [showFeatured, setShowFeatured] = useState(profile?.show_featured !== false);
  const [showCategories, setShowCategories] = useState(profile?.show_categories !== false);
  const [showWorkflow, setShowWorkflow] = useState(profile?.show_workflow !== false);
  const [showStats, setShowStats] = useState(profile?.show_stats !== false);
  const [showBlogs, setShowBlogs] = useState(profile?.show_blogs !== false);
  const [showContact, setShowContact] = useState(profile?.show_contact !== false);
  const [featuredTitle, setFeaturedTitle] = useState(profile?.featured_title || '');
  const [categoriesTitle, setCategoriesTitle] = useState(profile?.categories_title || '');
  const [blogsTitle, setBlogsTitle] = useState(profile?.blogs_title || '');

  const [heroBgType, setHeroBgType] = useState<'color' | 'image' | 'video'>(profile?.hero_bg_type || 'color');
  const [heroBgUrl, setHeroBgUrl] = useState(profile?.hero_bg_url || '');
  const [heroVideoProjectId, setHeroVideoProjectId] = useState(profile?.hero_video_project_id || '');
  const [homepageFeaturedProjectIds, setHomepageFeaturedProjectIds] = useState<string[]>(
    profile?.homepage_featured_project_ids || []
  );
  const [homepageCategoryIds, setHomepageCategoryIds] = useState<string[]>(
    profile?.homepage_category_ids || []
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setUrl: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const newProfile = {
      ...profile,
      full_name: fullName,
      headline,
      short_bio: shortBio,
      about_content: aboutContent,
      avatar_url: avatarUrl,
      email,
      phone,
      zalo_url: zaloUrl,
      facebook_url: facebookUrl,
      tiktok_url: tiktokUrl,
      instagram_url: instagramUrl,
      youtube_url: youtubeUrl,
      cta_text: ctaText,
      show_hero: showHero,
      show_featured: showFeatured,
      show_categories: showCategories,
      show_workflow: showWorkflow,
      show_stats: showStats,
      show_blogs: showBlogs,
      show_contact: showContact,
      featured_title: featuredTitle,
      categories_title: categoriesTitle,
      blogs_title: blogsTitle,
      hero_bg_type: heroBgType,
      hero_bg_url: heroBgUrl,
      hero_video_project_id: heroVideoProjectId,
      homepage_featured_project_ids: homepageFeaturedProjectIds,
      homepage_category_ids: homepageCategoryIds
    };

    await updateProfile(newProfile);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cấu hình Profile & Site Settings</h1>
        <p className="text-xs text-slate-505 text-slate-500">Quản lý thông tin hiển thị cá nhân, các social link và nội dung giới thiệu.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {success && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <IconCheck className="w-4 h-4" />
            Cập nhật cấu hình profile thành công! Thông tin mới đã được cập nhật ngoài trang public.
          </div>
        )}

        {/* 1. Personal Info */}
        <div className="border border-card-border bg-white shadow-sm p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2 border-b border-card-border pb-3">
            <IconUser className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Thông tin cá nhân</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Họ & Tên *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Thảo Quyên"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* Avatar URL / File upload */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Ảnh đại diện URL *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
                />
                <label className="inline-flex items-center justify-center rounded-xl border border-slate-200 hover:border-primary/50 hover:bg-slate-50 px-4 text-xs font-semibold text-slate-700 cursor-pointer transition-colors">
                  Tải lên
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setAvatarUrl)}
                  />
                </label>
              </div>
              {avatarUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] text-slate-450 text-slate-400">Xem trước:</span>
                  <img src={avatarUrl} alt="Avatar Preview" className="h-10 w-10 object-cover rounded-full border border-slate-200" />
                </div>
              )}
            </div>

            {/* Headline */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600">Headline chính (Hero Title) *</label>
              <input
                type="text"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Creative Video Editor for Brands, Creators & Businesses"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* Short Bio */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600">Mô tả ngắn bio *</label>
              <input
                type="text"
                required
                value={shortBio}
                onChange={(e) => setShortBio(e.target.value)}
                placeholder="Dựng video quảng cáo, Reels, TikTok..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* About Content */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600">Nội dung giới thiệu chi tiết (Trang About)</label>
              <textarea
                rows={5}
                value={aboutContent}
                onChange={(e) => setAboutContent(e.target.value)}
                placeholder="Giới thiệu đầy đủ kinh nghiệm làm việc, mệnh ngũ hành..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Contact details & CTA */}
        <div className="border border-card-border bg-white shadow-sm p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2 border-b border-card-border pb-3">
            <IconSettings className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Liên hệ & CTA</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Số điện thoại liên lạc</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0987 654 321"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* Zalo */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Zalo Link</label>
              <input
                type="url"
                value={zaloUrl}
                onChange={(e) => setZaloUrl(e.target.value)}
                placeholder="https://zalo.me/..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* CTA text */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Nút kêu gọi hành động (CTA Text)</label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="Liên hệ làm video ngay"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* 3. Social connections */}
        <div className="border border-card-border bg-white shadow-sm p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2 border-b border-card-border pb-3">
            <IconSettings className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Mạng xã hội</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Facebook */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Facebook URL</label>
              <input
                type="url"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* TikTok */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">TikTok URL</label>
              <input
                type="url"
                value={tiktokUrl}
                onChange={(e) => setTiktokUrl(e.target.value)}
                placeholder="https://tiktok.com/@..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* Instagram */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Instagram URL</label>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* YouTube */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">YouTube URL</label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* 4. Cấu hình hiển thị Trang Chủ */}
        <div className="border border-card-border bg-white shadow-sm p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2 border-b border-card-border pb-3">
            <IconSettings className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Cấu hình hiển thị Trang Chủ</h3>
          </div>

          <div className="space-y-6">
            {/* Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showHero}
                  onChange={(e) => setShowHero(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-350 bg-slate-50 text-emerald-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                Hiện phần Hero (Banner chính)
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFeatured}
                  onChange={(e) => setShowFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-350 bg-slate-50 text-emerald-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                Hiện phần Dự án nổi bật
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCategories}
                  onChange={(e) => setShowCategories(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-350 bg-slate-50 text-emerald-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                Hiện phần Danh mục video
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showWorkflow}
                  onChange={(e) => setShowWorkflow(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-350 bg-slate-50 text-emerald-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                Hiện phần Quy trình làm việc
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showStats}
                  onChange={(e) => setShowStats(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-350 bg-slate-50 text-emerald-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                Hiện phần Chỉ số (Thống kê)
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBlogs}
                  onChange={(e) => setShowBlogs(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-350 bg-slate-50 text-emerald-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                Hiện phần Blog chia sẻ
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showContact}
                  onChange={(e) => setShowContact(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-350 bg-slate-50 text-emerald-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                Hiện phần Banner liên hệ
              </label>
            </div>

            {/* Custom section titles */}
            <div className="border-t border-card-border pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Featured title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Tiêu đề phần Dự án nổi bật</label>
                <input
                  type="text"
                  value={featuredTitle}
                  onChange={(e) => setFeaturedTitle(e.target.value)}
                  placeholder="Dự án nổi bật"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
                />
              </div>

              {/* Categories title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Tiêu đề phần Danh mục video</label>
                <input
                  type="text"
                  value={categoriesTitle}
                  onChange={(e) => setCategoriesTitle(e.target.value)}
                  placeholder="Danh mục video"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
                />
              </div>

              {/* Blogs title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Tiêu đề phần Blog chia sẻ</label>
                <input
                  type="text"
                  value={blogsTitle}
                  onChange={(e) => setBlogsTitle(e.target.value)}
                  placeholder="Cập nhật mới & Kinh nghiệm"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Custom Hero Background Settings */}
            <div className="border-t border-card-border pt-4 space-y-4">
              <h4 className="text-xs font-bold text-slate-800">Nền phần Hero (Banner chính)</h4>
              <div className="flex flex-wrap gap-6 text-xs text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="radio"
                    name="heroBgType"
                    value="color"
                    checked={heroBgType === 'color'}
                    onChange={() => setHeroBgType('color')}
                    className="h-4 w-4 text-emerald-600 focus:ring-0 cursor-pointer"
                  />
                  Màu / Hiệu ứng mặc định
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="radio"
                    name="heroBgType"
                    value="image"
                    checked={heroBgType === 'image'}
                    onChange={() => setHeroBgType('image')}
                    className="h-4 w-4 text-emerald-600 focus:ring-0 cursor-pointer"
                  />
                  Hình ảnh tùy chỉnh
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="radio"
                    name="heroBgType"
                    value="video"
                    checked={heroBgType === 'video'}
                    onChange={() => setHeroBgType('video')}
                    className="h-4 w-4 text-emerald-600 focus:ring-0 cursor-pointer"
                  />
                  Video tùy chỉnh
                </label>
              </div>

              {/* Image Input option */}
              {heroBgType === 'image' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600">Hình ảnh nền Hero (URL hoặc tải lên)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={heroBgUrl}
                      onChange={(e) => setHeroBgUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
                    />
                    <label className="inline-flex items-center justify-center rounded-xl border border-slate-200 hover:border-primary/50 hover:bg-slate-50 px-4 text-xs font-semibold text-slate-700 cursor-pointer transition-colors">
                      Chọn file
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setHeroBgUrl)}
                      />
                    </label>
                  </div>
                  {heroBgUrl && (
                    <div className="mt-2 relative h-20 w-40 rounded-lg overflow-hidden border border-slate-200">
                      <img src={heroBgUrl} alt="Hero Background Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>
              )}

              {/* Video Input option */}
              {heroBgType === 'video' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600">Hoặc chọn video từ Danh sách Dự án sẵn có</label>
                    <select
                      value={heroVideoProjectId}
                      onChange={(e) => {
                        setHeroVideoProjectId(e.target.value);
                        const proj = projects.find(p => p.id === e.target.value);
                        if (proj?.video_url) setHeroBgUrl(proj.video_url);
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
                    >
                      <option value="">-- Chọn một dự án video --</option>
                      {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.title} ({p.video_url})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600">Nhập URL video hoặc Tải file video lên máy chủ client</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={heroBgUrl}
                        onChange={(e) => setHeroBgUrl(e.target.value)}
                        placeholder="https://example.com/video.mp4 hoặc link YouTube/Vimeo"
                        className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
                      />
                      <label className="inline-flex items-center justify-center rounded-xl border border-slate-200 hover:border-primary/50 hover:bg-slate-50 px-4 text-xs font-semibold text-slate-700 cursor-pointer transition-colors">
                        Chọn file
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, setHeroBgUrl)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Featured Projects slots */}
            <div className="border-t border-card-border pt-4 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 font-sans">Chọn video cụ thể cho phần Dự án nổi bật (tối đa 3 dự án)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[0, 1, 2].map((slotIndex) => (
                  <div key={slotIndex} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">Video ở vị trí {slotIndex + 1}</label>
                    <select
                      value={homepageFeaturedProjectIds[slotIndex] || ''}
                      onChange={(e) => {
                        const updated = [...homepageFeaturedProjectIds];
                        updated[slotIndex] = e.target.value;
                        setHomepageFeaturedProjectIds(updated);
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
                    >
                      <option value="">-- Trống --</option>
                      {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Categories checkboxes */}
            <div className="border-t border-card-border pt-4 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 font-sans">Chọn danh mục dịch vụ xuất hiện ở trang chủ</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map((cat) => {
                  const isChecked = homepageCategoryIds.includes(cat.id);
                  return (
                    <label key={cat.id} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setHomepageCategoryIds([...homepageCategoryIds, cat.id]);
                          } else {
                            setHomepageCategoryIds(homepageCategoryIds.filter(id => id !== cat.id));
                          }
                        }}
                        className="h-4 w-4 rounded border-slate-350 bg-slate-50 text-emerald-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      {cat.name}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="rounded-xl bg-primary px-8 py-3 text-xs font-semibold text-white hover:bg-emerald-500 hover:shadow-lg active:scale-[0.98] transition-all"
          >
            Lưu tất cả cấu hình
          </button>
        </div>
      </form>
    </div>
  );
}
