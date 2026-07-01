export interface Profile {
  id: string;
  full_name: string;
  headline: string;
  short_bio: string;
  about_content: string;
  avatar_url: string;
  email: string;
  phone: string;
  zalo_url: string;
  facebook_url: string;
  tiktok_url: string;
  instagram_url: string;
  youtube_url: string;
  cta_text: string;
  show_hero: boolean;
  show_featured: boolean;
  show_categories: boolean;
  show_workflow: boolean;
  show_stats: boolean;
  show_blogs: boolean;
  show_contact: boolean;
  featured_title: string;
  categories_title: string;
  blogs_title: string;
  hero_bg_type: 'color' | 'image' | 'video';
  hero_bg_url: string;
  hero_video_project_id: string;
  homepage_featured_project_ids: string[];
  homepage_category_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  category_id: string;
  client_name: string;
  tools_used: string[];
  project_goals: string;
  editor_role: string;
  is_featured: boolean;
  is_published: boolean;
  project_date: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string;
  status: 'draft' | 'published';
  published_at: string;
  created_at: string;
  updated_at: string;
}

// ----------------------------------------------------
// SEED DATA
// ----------------------------------------------------

const SEED_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "TikTok / Reels / Shorts",
    slug: "tiktok-reels-shorts",
    description: "Các video ngắn, chuyển cảnh mượt mà, nhiều sub sống động và nhịp độ nhanh giúp tăng chuyển đổi và tương tác.",
    thumbnail_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "cat-2",
    name: "Product Video",
    slug: "product-video",
    description: "Video giới thiệu sản phẩm sắc nét, tập trung vào chi tiết, chất liệu, tính năng nổi bật của sản phẩm.",
    thumbnail_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "cat-3",
    name: "Beauty / Skincare Video",
    slug: "beauty-skincare-video",
    description: "Thước phim dịu nhẹ, tone màu tươi sáng tự nhiên, tôn vinh làn da và vẻ đẹp của sản phẩm mỹ phẩm.",
    thumbnail_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "cat-4",
    name: "Personal Branding Video",
    slug: "personal-branding-video",
    description: "Xây dựng thương hiệu cá nhân qua các video story, phỏng vấn, chia sẻ kinh nghiệm có chiều sâu.",
    thumbnail_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "cat-5",
    name: "Ads Video",
    slug: "ads-video",
    description: "Video quảng cáo ngắn gọn, thu hút sự chú ý trong 3 giây đầu, thúc đẩy quyết định mua hàng.",
    thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "cat-6",
    name: "AI Video",
    slug: "ai-video",
    description: "Kết hợp các công cụ AI tạo hình ảnh và video hiện đại cùng khả năng edit chuyên nghiệp.",
    thumbnail_url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "cat-7",
    name: "YouTube Video",
    slug: "youtube-video",
    description: "Các video dài, vlog, tài liệu học tập, chia sẻ với bố cục thông tin rõ ràng và âm thanh cuốn hút.",
    thumbnail_url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "cat-8",
    name: "Event Video",
    slug: "event-video",
    description: "Recap các sự kiện, buổi họp mặt, tiệc cưới với nhịp điệu cảm xúc, lưu trữ những khoảnh khắc đẹp nhất.",
    thumbnail_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const SEED_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Beauty Product Short Video",
    slug: "beauty-product-short-video",
    short_description: "Video ngắn giới thiệu serum phục hồi da, tập trung vào texture căng bóng và hiệu ứng thư thái.",
    description: "Dự án video ngắn dành cho nhãn hàng GlowSkin nhằm giới thiệu dòng serum mới. Với định hướng tạo ra cảm giác tinh khiết và thư giãn, video tập trung tối đa vào các góc quay cận cảnh giọt serum, độ thẩm thấu trên da và các chuyển cảnh mượt mà kết hợp hiệu ứng âm thanh nhẹ nhàng.",
    thumbnail_url: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=800&q=80",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Rickroll as fallback safe video
    category_id: "cat-3",
    client_name: "GlowSkin Cosmetics",
    tools_used: ["CapCut", "Photoshop", "Premiere Pro"],
    project_goals: "Tăng 50% lượt nhấp chuột mua hàng trên landing page qua kênh TikTok Ads.",
    editor_role: "Lead Video Editor & Colorist. Xử lý toàn bộ phần cắt ghép, hiệu chỉnh màu sắc sáng trong và sound design thiên nhiên.",
    is_featured: true,
    is_published: true,
    project_date: "2026-05-15",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "proj-2",
    title: "TikTok Sales Video",
    slug: "tiktok-sales-video",
    short_description: "Video bán hàng thời trang đường phố năng động với nhịp điệu nhạc hiphop và chuyển cảnh liên tục.",
    description: "Một video ngắn 30 giây được thiết kế đặc thù để chạy quảng cáo TikTok cho dòng sản phẩm áo khoác Streetwear mới của FlexWear. Video sử dụng nhịp điệu nhanh, các font chữ hiển thị nổi bật dạng kinetic text và các cú chuyển cảnh theo nhịp beat cực cuốn.",
    thumbnail_url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category_id: "cat-1",
    client_name: "FlexWear Apparel",
    tools_used: ["Premiere Pro", "CapCut", "Canva"],
    project_goals: "Tạo độ nhận diện cho bộ sưu tập hè và thu hút 100k view tự nhiên trong 3 ngày đầu.",
    editor_role: "Creative Video Editor. Lên nhịp chuyển cảnh, edit và chọn sound effects tăng tính hành động.",
    is_featured: true,
    is_published: true,
    project_date: "2026-06-01",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "proj-3",
    title: "Personal Branding Reel",
    slug: "personal-branding-reel",
    short_description: "Reel giới thiệu phong cách sống và làm việc của Tech Influencer Minh Đức.",
    description: "Dự án hợp tác cùng anh Minh Đức để sản xuất một chuỗi video ngắn xây dựng thương hiệu cá nhân trên Facebook Reels và Instagram. Thể hiện hình ảnh một chuyên gia công nghệ trẻ trung, năng động, am hiểu sâu rộng nhưng cực kỳ gần gũi.",
    thumbnail_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category_id: "cat-4",
    client_name: "Minh Đức (Tech Influencer)",
    tools_used: ["After Effects", "Premiere Pro", "Photoshop"],
    project_goals: "Truyền tải thông điệp rõ ràng về hành trình số hóa doanh nghiệp, thu hút thêm followers chất lượng.",
    editor_role: "Offline & Online Editor. Edit thô dựa trên script phỏng vấn, dựng hiệu ứng mô tả pop-up và mix âm thanh.",
    is_featured: true,
    is_published: true,
    project_date: "2026-04-20",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "proj-4",
    title: "AI Skincare Video",
    slug: "ai-skincare-video",
    short_description: "Video concept quảng cáo tương lai sử dụng AI kết hợp kỹ thuật VFX trong After Effects.",
    description: "Thử nghiệm ứng dụng các mô hình tạo video AI (Runway Gen-2 & Midjourney) để tạo ra các cảnh quay hoa nở siêu thực và nước mát kết hợp cùng các chi tiết bao bì 3D. Đây là hướng đi mới giúp nhãn hàng tiết kiệm tối đa chi phí quay dựng studio thực tế.",
    thumbnail_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category_id: "cat-6",
    client_name: "Future Beauty Lab",
    tools_used: ["Midjourney", "Runway Gen-2", "After Effects", "CapCut"],
    project_goals: "Minh họa năng lực ứng dụng AI vào việc sản xuất video quảng cáo mẫu cho khách hàng tham khảo.",
    editor_role: "AI Prompt Engineer & Video Editor. Tạo prompt hình ảnh/video, ghép nối và xử lý âm thanh, đồng bộ nhịp.",
    is_featured: false,
    is_published: true,
    project_date: "2026-06-10",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "proj-5",
    title: "Product Ads Video",
    slug: "product-ads-video",
    short_description: "Video TVC ngắn quảng cáo nước ép trái cây PureJuice mát lạnh ngày hè.",
    description: "Video thương mại giới thiệu dòng nước ép cam nguyên chất. Tập trung vào âm thanh đá viên va chạm, tiếng rót nước sống động và màu cam rực rỡ thu hút thị giác cực mạnh.",
    thumbnail_url: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category_id: "cat-5",
    client_name: "PureJuice Co.",
    tools_used: ["Premiere Pro", "After Effects", "Audition"],
    project_goals: "Tạo cảm giác sảng khoái kích thích vị giác người xem, thúc đẩy chiến dịch hè.",
    editor_role: "Video Editor & Sound Designer. Xử lý kĩ xảo slow-motion và đồng bộ tiếng rót nước cực kì thực tế.",
    is_featured: false,
    is_published: true,
    project_date: "2026-05-30",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const SEED_POSTS: Post[] = [
  {
    id: "post-1",
    title: "Cách một video ngắn giúp thương hiệu bán hàng tốt hơn",
    slug: "cach-video-ngan-giup-thuong-hieu-ban-hang-tot-hon",
    excerpt: "Tìm hiểu vì sao video dạng ngắn (short-form) lại trở thành công cụ đắc lực nhất giúp tăng tỷ lệ chuyển đổi cho các thương hiệu hiện đại.",
    content: `Trong kỷ nguyên số ngày nay, khoảng thời gian chú ý trung bình của người dùng internet đã giảm xuống chỉ còn khoảng **8 giây**. Điều này đặt ra một thách thức vô cùng lớn đối với các thương hiệu khi muốn tiếp cận khách hàng. Video ngắn (TikTok, Reels, Shorts) chính là chìa khóa vàng giải quyết bài toán này.

### 1. Thu hút ngay trong 3 giây đầu tiên
Một video ngắn thành công luôn sở hữu một "hook" (yếu tố giữ chân) cực mạnh ngay từ 3 giây đầu. Đó có thể là một câu hỏi gây tò mò, một hình ảnh ấn tượng hoặc một âm thanh bắt tai. Nếu vượt qua 3 giây này, cơ hội khách hàng xem hết video sẽ tăng lên đến 70%.

### 2. Tiết kiệm thời gian, truyền tải nhanh chóng
Thay vì bắt người dùng đọc một bài viết dài hoặc xem video giới thiệu 5 phút, một video 30 giây được dựng thông minh có thể giải thích rõ ràng:
- Sản phẩm giải quyết nỗi đau gì?
- Tại sao nên mua ngay?
- Ưu đãi hấp dẫn hiện tại.

### 3. Thuật toán ưu tiên hiển thị
Các nền tảng mạng xã hội đang dồn toàn bộ lưu lượng (traffic) để đẩy mạnh tính năng Reels, Shorts và TikTok. Một video được dựng chỉn chu, có tính giải trí hoặc mang lại giá trị kiến thức có khả năng tiếp cận hàng triệu người mà không tốn một đồng chi phí quảng cáo.

> **Thảo Quyên's Tip:** Hãy tập trung vào việc tạo ra cảm xúc. Người dùng không mua sản phẩm vì tính năng, họ mua vì cảm xúc mà sản phẩm và video mang lại cho họ.`,
    thumbnail_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    status: "published",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "post-2",
    title: "Quy trình dựng một video quảng cáo ngắn chuyên nghiệp",
    slug: "quy-trinh-dung-mot-video-quang-cao-ngan-chuyen-nghiep",
    excerpt: "Khám phá quy trình chuyên nghiệp đằng sau mỗi giây hình từ khâu lên storyboard, phân loại source, cắt thô đến tinh chỉnh âm thanh, hiệu ứng.",
    content: `Nhiều người nghĩ rằng dựng video chỉ là cắt ghép các file quay sẵn lại với nhau. Tuy nhiên, đằng sau một sản phẩm video quảng cáo ngắn triệu view là cả một quy trình kỹ lưỡng và nghiêm túc.

Dưới đây là 5 bước cốt lõi trong quy trình làm việc của Thảo Quyên:

### Bước 1: Nghiên cứu đề bài & Storyboard
Trước khi mở phần mềm edit, bạn cần biết rõ mục tiêu của video là gì. Ai là người xem? Sau khi xem xong, họ cần thực hiện hành động gì? Mình sẽ phân tích kịch bản viết sẵn và vẽ ra mạch cảm xúc để chọn nhạc nền (BGM) phù hợp nhất.

### Bước 2: Phân loại Source & Cắt thô (A-Roll)
Đây là khâu tiết kiệm thời gian nhất nếu làm đúng. Mình sẽ gom tất cả video đã quay, loại bỏ những file hỏng, out nét. Sau đó đặt những cảnh quay chính lên timeline theo đúng mạch truyện. Đây gọi là bản cắt thô (Rough Cut).

### Bước 3: Đắp tư liệu & B-Roll
Để video không bị nhàm chán, mình xen kẽ các cảnh quay cận cảnh chi tiết sản phẩm, các hiệu ứng hình ảnh (VFX), hay zoom-in zoom-out nhẹ nhàng để giữ mắt người xem luôn chuyển động theo câu chuyện.

### Bước 4: Sound Design - Linh hồn của Video ngắn
**90% sự sống động của video ngắn nằm ở âm thanh.** Tiếng giọt nước rơi, tiếng rít gió khi chuyển cảnh, tiếng gõ phím nhẹ nhàng. Sound design giúp người xem có cảm giác như họ đang trực tiếp trải nghiệm sản phẩm.

### Bước 5: Phân màu (Color Grading) & Xuất bản
Một tone màu đúng sẽ thể hiện đúng cá tính thương hiệu. Skincare cần sáng trong, thời trang cần retro/cá tính, sản phẩm công nghệ cần tone lạnh sang trọng. Cuối cùng, video sẽ được tối ưu hóa xuất ra định dạng dọc chất lượng cao nhất để sẵn sàng đăng tải.`,
    thumbnail_url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
    status: "published",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "post-3",
    title: "Vì sao doanh nghiệp nhỏ nên có portfolio video chuyên nghiệp",
    slug: "vi-sao-doanh-nghiep-nho-nen-co-portfolio-video-chuyen-nghiep",
    excerpt: "Một portfolio ấn tượng giúp bạn thuyết phục khách hàng dễ dàng hơn. Cùng phân tích tầm quan trọng của video portfolio trong việc xây dựng lòng tin.",
    content: `Khách hàng hiện đại không còn tin vào những lời quảng cáo sáo rỗng. Họ muốn thấy thực tế. Đặc biệt đối với các doanh nghiệp vừa và nhỏ, việc sở hữu một kho lưu trữ các video dự án (video portfolio) chất lượng cao là cách nhanh nhất và rẻ nhất để xây dựng niềm tin vững chắc.

### Khách hàng mua bằng mắt
Một portfolio trực quan, trình bày đẹp mắt giống như một showroom lộng lẫy trên internet. Khi khách hàng ghé thăm, họ có thể ngay lập tức xem các sản phẩm thực tế đã được dựng lên trông chuyên nghiệp như thế nào.

### Khẳng định năng lực chuyên môn
Chất lượng dựng video phản ánh thái độ và quy chuẩn làm việc của bạn. Khi bạn có một danh mục các dự án đa dạng từ TikTok, Ads, Beauty đến AI Video, khách hàng sẽ cảm nhận được sự đa năng và kinh nghiệm phong phú.

### Rút ngắn quy trình tư vấn
Thay vì mất nhiều giờ giải thích bạn sẽ dựng video như thế nào, bạn chỉ cần gửi link portfolio các sản phẩm tương tự đã làm. Khách hàng xem xong, ưng ý style và chốt hợp đồng nhanh hơn gấp 3 lần.`,
    thumbnail_url: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
    status: "published",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const INITIAL_PROFILE: Profile = {
  id: "profile-1",
  full_name: "Trịnh Thảo Quyên",
  headline: "Creative Video Editor for Brands, Creators & Businesses",
  short_bio: "Dựng video quảng cáo, short-form content, Reels, TikTok, video bán hàng, video cá nhân & thương hiệu.",
  about_content: "Chào bạn, mình là Trịnh Thảo Quyên - một Video Editor đầy nhiệt huyết hoạt động tại TP. Hồ Chí Minh. Mình chuyên sâu về các định dạng video ngắn, Reels, TikTok, video sản phẩm và xây dựng thương hiệu cá nhân. Với mệnh Mộc (sinh ngày 22/12/2003), mình luôn hướng tới sự phát triển, sinh sôi và tươi mới. Mình mong muốn thổi hồn và mang lại sự sống động, sáng tạo cho từng thước phim của bạn để kết nối thương hiệu với khách hàng một cách mạnh mẽ nhất.",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
  email: "contact@thaoquyen.com",
  phone: "0943851121",
  zalo_url: "https://zalo.me/0943851121",
  facebook_url: "https://www.facebook.com/trinhquyen2911",
  tiktok_url: "",
  instagram_url: "",
  youtube_url: "",
  cta_text: "Liên hệ làm video ngay",
  show_hero: true,
  show_featured: true,
  show_categories: true,
  show_workflow: true,
  show_stats: true,
  show_blogs: true,
  show_contact: true,
  featured_title: "Dự Án Nổi Bật",
  categories_title: "Danh Mục Dịch Vụ",
  blogs_title: "Cập nhật mới & Kinh nghiệm",
  hero_bg_type: 'color',
  hero_bg_url: '',
  hero_video_project_id: '',
  homepage_featured_project_ids: ['proj-1', 'proj-2', 'proj-3'],
  homepage_category_ids: ['cat-1', 'cat-2', 'cat-3', 'cat-4'],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// ----------------------------------------------------
// STORAGE HELPERS (safe for SSR)
// ----------------------------------------------------

const IS_CLIENT = typeof window !== 'undefined';

function getStorageItem<T>(key: string, defaultValue: T): T {
  if (!IS_CLIENT) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading key ${key} from localStorage:`, error);
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (!IS_CLIENT) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing key ${key} to localStorage:`, error);
  }
}

// ----------------------------------------------------
// DATABASE API
// ----------------------------------------------------

export const mockDb = {
  // Profiles
  getProfile(): Profile {
    const profile = getStorageItem<Profile>('tq_profile', INITIAL_PROFILE);
    // Force patch to migrate database values to the user's correct contact/social info
    let changed = false;
    if (profile.phone === "0987 654 321" || profile.phone === "0987654321") {
      profile.phone = "0943851121";
      profile.full_name = "Trịnh Thảo Quyên";
      changed = true;
    }
    if (profile.zalo_url === "https://zalo.me/0987654321") {
      profile.zalo_url = "https://zalo.me/0943851121";
      changed = true;
    }
    if (profile.facebook_url === "https://facebook.com/thaoquyen.editor" || profile.facebook_url === "https://facebook.com/trinhquyen2911") {
      profile.facebook_url = "https://www.facebook.com/trinhquyen2911";
      changed = true;
    }
    if (profile.tiktok_url === "https://tiktok.com/@thaoquyen.editor") {
      profile.tiktok_url = "";
      changed = true;
    }
    if (profile.instagram_url === "https://instagram.com/thaoquyen.editor") {
      profile.instagram_url = "";
      changed = true;
    }
    if (profile.youtube_url === "https://youtube.com/@thaoquyen.editor") {
      profile.youtube_url = "";
      changed = true;
    }
    if (changed) {
      setStorageItem('tq_profile', profile);
    }
    return profile;
  },
  saveProfile(profile: Profile): void {
    profile.updated_at = new Date().toISOString();
    setStorageItem('tq_profile', profile);
  },

  // Categories
  getCategories(): Category[] {
    return getStorageItem<Category[]>('tq_categories', SEED_CATEGORIES);
  },
  getCategoryById(id: string): Category | undefined {
    return this.getCategories().find(c => c.id === id);
  },
  getCategoryBySlug(slug: string): Category | undefined {
    return this.getCategories().find(c => c.slug === slug);
  },
  createCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Category {
    const categories = this.getCategories();
    const newCategory: Category = {
      ...category,
      id: `cat-${Math.random().toString(36).substring(2, 9)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    categories.push(newCategory);
    setStorageItem('tq_categories', categories);
    return newCategory;
  },
  updateCategory(id: string, updatedFields: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>): Category {
    const categories = this.getCategories();
    const idx = categories.findIndex(c => c.id === id);
    if (idx === -1) throw new Error("Category not found");
    const updatedCategory = {
      ...categories[idx],
      ...updatedFields,
      updated_at: new Date().toISOString()
    };
    categories[idx] = updatedCategory;
    setStorageItem('tq_categories', categories);
    return updatedCategory;
  },
  deleteCategory(id: string): boolean {
    // Check if any projects belong to this category
    const projects = this.getProjects();
    const hasProjects = projects.some(p => p.category_id === id);
    if (hasProjects) {
      throw new Error("Không thể xóa category này vì vẫn còn các video project thuộc danh mục này.");
    }
    const categories = this.getCategories();
    const filtered = categories.filter(c => c.id !== id);
    setStorageItem('tq_categories', filtered);
    return true;
  },

  // Projects
  getProjects(): Project[] {
    return getStorageItem<Project[]>('tq_projects', SEED_PROJECTS);
  },
  getProjectById(id: string): Project | undefined {
    return this.getProjects().find(p => p.id === id);
  },
  getProjectBySlug(slug: string): Project | undefined {
    return this.getProjects().find(p => p.slug === slug);
  },
  createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Project {
    const projects = this.getProjects();
    const newProject: Project = {
      ...project,
      id: `proj-${Math.random().toString(36).substring(2, 9)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    projects.push(newProject);
    setStorageItem('tq_projects', projects);
    return newProject;
  },
  updateProject(id: string, updatedFields: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>): Project {
    const projects = this.getProjects();
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1) throw new Error("Project not found");
    const updatedProject = {
      ...projects[idx],
      ...updatedFields,
      updated_at: new Date().toISOString()
    };
    projects[idx] = updatedProject;
    setStorageItem('tq_projects', projects);
    return updatedProject;
  },
  deleteProject(id: string): boolean {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    setStorageItem('tq_projects', filtered);
    return true;
  },

  // Posts (Blog)
  getPosts(): Post[] {
    return getStorageItem<Post[]>('tq_posts', SEED_POSTS);
  },
  getPostById(id: string): Post | undefined {
    return this.getPosts().find(p => p.id === id);
  },
  getPostBySlug(slug: string): Post | undefined {
    return this.getPosts().find(p => p.slug === slug);
  },
  createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Post {
    const posts = this.getPosts();
    const newPost: Post = {
      ...post,
      id: `post-${Math.random().toString(36).substring(2, 9)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    posts.push(newPost);
    setStorageItem('tq_posts', posts);
    return newPost;
  },
  updatePost(id: string, updatedFields: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>): Post {
    const posts = this.getPosts();
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) throw new Error("Post not found");
    const updatedPost = {
      ...posts[idx],
      ...updatedFields,
      updated_at: new Date().toISOString()
    };
    posts[idx] = updatedPost;
    setStorageItem('tq_posts', posts);
    return updatedPost;
  },
  deletePost(id: string): boolean {
    const posts = this.getPosts();
    const filtered = posts.filter(p => p.id !== id);
    setStorageItem('tq_posts', filtered);
    return true;
  }
};
