import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MockDbProvider } from "@/context/MockDbContext";

const montserrat = localFont({
  src: [
    {
      path: "../Asset/Montserrat/Montserrat-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../Asset/Montserrat/Montserrat-Italic-VariableFont_wght.ttf",
      style: "italic",
    }
  ],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Thảo Quyên | Creative Video Editor Portfolio",
  description: "Portfolio dựng video chuyên nghiệp của Thảo Quyên. Chuyên dựng video ngắn, Reels, TikTok, video quảng cáo sản phẩm và xây dựng thương hiệu cá nhân.",
  keywords: ["Thao Quyen Video Editor", "Video Editor", "Dung video TikTok", "Dung Reels", "Dung video san pham", "Thao Quyen Portfolio"],
  authors: [{ name: "Thảo Quyên" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#f8fafc] text-[#0f172a]"
        suppressHydrationWarning
      >
        <MockDbProvider>
          {children}
        </MockDbProvider>
      </body>
    </html>
  );
}
