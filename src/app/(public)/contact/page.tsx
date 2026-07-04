'use client';

import { useState } from 'react';
import { useSiteData } from '@/context/SiteDataContext';
import {
  IconBrandFacebook,
  IconBrandTiktok,
  IconBrandInstagram,
  IconBrandYoutube,
  IconPhone,
  IconSend,
  IconCheck
} from '@tabler/icons-react';

export default function ContactPage() {
  const { profile } = useSiteData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('tiktok');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  const contactOptions = [
    {
      label: 'Số điện thoại / Zalo',
      value: profile?.phone || '0943851121',
      href: profile?.zalo_url || 'https://zalo.me/0943851121',
      icon: <IconPhone className="w-5 h-5 text-emerald-600" />
    }
  ];

  const socialLinks = [
    { name: 'Facebook', url: profile?.facebook_url, icon: <IconBrandFacebook className="w-5 h-5" /> },
    { name: 'TikTok', url: profile?.tiktok_url, icon: <IconBrandTiktok className="w-5 h-5" /> },
    { name: 'Instagram', url: profile?.instagram_url, icon: <IconBrandInstagram className="w-5 h-5" /> },
    { name: 'YouTube', url: profile?.youtube_url, icon: <IconBrandYoutube className="w-5 h-5" /> }
  ].filter(link => link.url);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Liên hệ hợp tác</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Gửi thông tin trao đổi công việc hoặc kết nối trực tiếp với Thảo Quyên qua các kênh liên lạc nhanh dưới đây.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Contact details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="border border-card-border bg-white shadow-sm p-6 rounded-2xl space-y-6">
            <h3 className="text-base font-bold text-slate-900 tracking-wide uppercase border-b border-card-border pb-3">Liên lạc nhanh</h3>

            <div className="space-y-6">
              {contactOptions.map((opt, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                    {opt.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 mb-0.5">{opt.label}</h4>
                    <a
                      href={opt.href}
                      target={opt.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-slate-800 hover:text-primary transition-colors text-sm font-semibold"
                    >
                      {opt.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social connection banner */}
          <div className="border border-card-border bg-white shadow-sm p-6 rounded-2xl space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Mạng xã hội của Quyên</h4>
            <p className="text-xs text-slate-500">
              Cập nhật các sản phẩm hậu kỳ hậu trường ngắn hạn nhanh nhất qua trang cá nhân.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 hover:border-primary/20 hover:text-primary transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="lg:col-span-7">
          <div className="border border-card-border bg-white shadow-sm p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-card-border pb-3">Để lại tin nhắn cho Quyên</h3>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <IconCheck className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Gửi thông tin thành công!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Cảm ơn bạn đã để lại tin nhắn. Thảo Quyên sẽ phản hồi lại qua Email hoặc Số điện thoại/Zalo trong vòng 24 giờ tới.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-primary hover:text-emerald-600 font-semibold underline"
                >
                  Gửi tin nhắn mới
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-600">Tên của bạn *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-600">Email của bạn *</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all"
                  />
                </div>

                {/* Project Category */}
                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-xs font-semibold text-slate-600">Loại video cần làm</label>
                  <select
                    id="projectType"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:border-primary/50 focus:outline-none focus:bg-white transition-all cursor-pointer shadow-sm"
                  >
                    <option value="tiktok">TikTok / Reels / Shorts</option>
                    <option value="product">Video Sản Phẩm (TVC)</option>
                    <option value="branding">Thương Hiệu Cá Nhân</option>
                    <option value="youtube">Vlog / Youtube Video</option>
                    <option value="ads">Video Quảng Cáo Khác</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-600">Nội dung dự án *</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mô tả ngắn gọn về sản phẩm, số lượng video cần dựng và mong muốn phong cách..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:outline-none focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-primary py-3.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:bg-emerald-600/50 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      Gửi tin nhắn ngay
                      <IconSend className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
