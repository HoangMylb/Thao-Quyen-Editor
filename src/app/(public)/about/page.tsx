'use client';

import Link from 'next/link';
import { useSiteData } from '@/context/SiteDataContext';
import {
  IconTool,
  IconClock,
  IconBriefcase,
  IconFlame,
  IconBrandTiktok,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube
} from '@tabler/icons-react';

export default function AboutPage() {
  const { profile } = useSiteData();

  const skills = [
    { name: "Cắt dựng video ngắn", level: "95%", icon: <IconFlame className="w-4 h-4 text-emerald-600" /> },
    { name: "Phối màu (Color Grading)", level: "90%", icon: <IconTool className="w-4 h-4 text-emerald-600" /> },
    { name: "Thiết kế âm thanh (Sound Design)", level: "85%", icon: <IconTool className="w-4 h-4 text-emerald-600" /> },
    { name: "Tối ưu tương tác giữ chân người xem", level: "90%", icon: <IconFlame className="w-4 h-4 text-emerald-600" /> },
    { name: "Dựng kịch bản hình ảnh (Storyboard)", level: "80%", icon: <IconBriefcase className="w-4 h-4 text-emerald-600" /> }
  ];

  const tools = [
    "Premiere Pro", "After Effects", "CapCut Pro", "Photoshop", "Audition", "Canva", "Midjourney", "Runway AI"
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Introduction Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Side: Avatar */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative group aspect-square w-72 h-72 sm:w-80 sm:h-80 md:w-full md:max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
            {/* Animated ambient glow inside image */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-200/50 via-transparent to-transparent z-10"></div>
            <img
              src={profile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
              alt={profile?.full_name || 'Thảo Quyên'}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right Side: Quick bio */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-emerald-700 font-mono text-xs tracking-widest uppercase">Video Editor · Born 22/12/2003</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Mình là {profile?.full_name || 'Thảo Quyên'}
            </h1>
            <p className="text-base text-emerald-700 font-semibold leading-relaxed">
              {profile?.headline}
            </p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
            {profile?.about_content || 'Chào bạn, mình là Trịnh Thảo Quyên - một Video Editor đầy nhiệt huyết hoạt động tại TP. Hồ Chí Minh. Mình chuyên sâu về các định dạng video ngắn, Reels, TikTok, video sản phẩm và xây dựng thương hiệu cá nhân. Với mệnh Mộc, mình mong muốn thổi hồn và mang lại sự sống động, sáng tạo cho từng thước phim của bạn để kết nối thương hiệu với khách hàng một cách mạnh mẽ nhất.'}
          </p>

          {/* Social connections */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {profile?.facebook_url && (
              <a
                href={profile.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 hover:border-primary/20 hover:text-primary px-4 py-2 text-xs font-semibold text-slate-700 transition-all"
              >
                <IconBrandFacebook className="w-4 h-4" />
                Facebook
              </a>
            )}
            {profile?.tiktok_url && (
              <a
                href={profile.tiktok_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 hover:border-primary/20 hover:text-primary px-4 py-2 text-xs font-semibold text-slate-700 transition-all"
              >
                <IconBrandTiktok className="w-4 h-4" />
                TikTok
              </a>
            )}
            {profile?.instagram_url && (
              <a
                href={profile.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 hover:border-primary/20 hover:text-primary px-4 py-2 text-xs font-semibold text-slate-700 transition-all"
              >
                <IconBrandInstagram className="w-4 h-4" />
                Instagram
              </a>
            )}
            {profile?.youtube_url && (
              <a
                href={profile.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 hover:border-primary/20 hover:text-primary px-4 py-2 text-xs font-semibold text-slate-700 transition-all"
              >
                <IconBrandYoutube className="w-4 h-4" />
                YouTube
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Experience, Skills & Tools Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-card-border">
        {/* Skills */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-card-border pb-3">Chuyên môn hậu kỳ</h2>
          <div className="space-y-4">
            {skills.map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    {skill.icon}
                    {skill.name}
                  </span>
                  <span className="text-primary font-mono">{skill.level}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: skill.level }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Workflow */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-card-border pb-3">Công cụ & Ứng dụng</h2>
          <p className="text-sm text-slate-650 leading-relaxed text-slate-600">
            Sử dụng thành thạo bộ công cụ Adobe phục vụ biên tập hậu kỳ cao cấp cùng các công cụ AI tạo hình mới nhất nhằm đa dạng hóa góc nhìn nghệ thuật.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-mono font-semibold text-slate-700 transition-all hover:border-primary/20 hover:bg-primary/5 shadow-sm cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="border border-card-border bg-white shadow-sm p-5 rounded-2xl flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
              <IconClock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Cam kết về thời gian</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Luôn bám sát timeline dự án đề ra ban đầu, bàn giao đúng hạn để thương hiệu chạy chiến dịch truyền thông kịp thời.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="border border-emerald-100 bg-emerald-50/50 p-8 rounded-3xl text-center space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Bạn thấy phong cách biên tập phù hợp?</h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Tìm kiếm một biên tập viên cộng tác lâu dài xây dựng kênh, hoặc edit riêng lẻ từng video sản phẩm. Hãy liên hệ với Thảo Quyên ngay hôm nay.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-500 shadow-sm"
          >
            Liên hệ thảo luận
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-slate-200 bg-slate-100 px-8 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 shadow-sm"
          >
            Xem lại dự án
          </Link>
        </div>
      </div>
    </div>
  );
}
