using Microsoft.EntityFrameworkCore;
using ThaoQuyenEditor.Api.Models;

namespace ThaoQuyenEditor.Api.Data;

public static class SeedData
{
    private static readonly DateTime SeedDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);

    public static async Task Initialize(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await context.Database.MigrateAsync();

        // Return if data already exists
        if (await context.AdminUsers.AnyAsync())
            return;

        // ── AdminUser ───────────────────────────────────────────
        var admin = new AdminUser
        {
            Id = Guid.NewGuid(),
            Email = "admin@thaoquyen.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
            CreatedAt = SeedDate
        };

        // ── Profile ─────────────────────────────────────────────
        var profile = new Profile
        {
            Id = Guid.Parse("A1B2C3D4-E5F6-7890-ABCD-EF1234567890"),
            FullName = "Trịnh Thảo Quyên",
            Headline = "Creative Video Editor for Brands, Creators & Businesses",
            ShortBio = "Dựng video quảng cáo, short-form content, Reels, TikTok, video bán hàng, video cá nhân & thương hiệu.",
            AboutContent = "Chào bạn, mình là Trịnh Thảo Quyên - một Video Editor đầy nhiệt huyết hoạt động tại TP. Hồ Chí Minh. Mình chuyên sâu về các định dạng video ngắn, Reels, TikTok, video sản phẩm và xây dựng thương hiệu cá nhân. Với mệnh Mộc (sinh ngày 22/12/2003), mình luôn hướng tới sự phát triển, sinh sôi và tươi mới. Mình mong muốn thổi hồn và mang lại sự sống động, sáng tạo cho từng thước phim của bạn để kết nối thương hiệu với khách hàng một cách mạnh mẽ nhất.",
            AvatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
            Email = "contact@thaoquyen.com",
            Phone = "0943851121",
            ZaloUrl = "https://zalo.me/0943851121",
            FacebookUrl = "https://www.facebook.com/trinhquyen2911",
            TiktokUrl = "",
            InstagramUrl = "",
            YoutubeUrl = "",
            CtaText = "Liên hệ làm video ngay",
            ShowHero = true,
            ShowFeatured = true,
            ShowCategories = true,
            ShowWorkflow = true,
            ShowStats = true,
            ShowBlogs = true,
            ShowContact = true,
            FeaturedTitle = "Dự Án Nổi Bật",
            CategoriesTitle = "Danh Mục Dịch Vụ",
            BlogsTitle = "Cập nhật mới & Kinh nghiệm",
            HeroBgType = "color",
            HeroBgUrl = "",
            HeroVideoProjectId = null,
            HomepageFeaturedProjectIds = """["A0000001-0000-0000-0000-000000000001","A0000002-0000-0000-0000-000000000002","A0000003-0000-0000-0000-000000000003"]""",
            HomepageCategoryIds = """["C0000001-0000-0000-0000-000000000001","C0000002-0000-0000-0000-000000000002","C0000003-0000-0000-0000-000000000003","C0000004-0000-0000-0000-000000000004"]""",
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        // ── Categories ──────────────────────────────────────────
        var cat1 = new Category
        {
            Id = Guid.Parse("C0000001-0000-0000-0000-000000000001"),
            Name = "TikTok / Reels / Shorts",
            Slug = "tiktok-reels-shorts",
            Description = "Các video ngắn, chuyển cảnh mượt mà, nhiều sub sống động và nhịp độ nhanh giúp tăng chuyển đổi và tương tác.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        var cat2 = new Category
        {
            Id = Guid.Parse("C0000002-0000-0000-0000-000000000002"),
            Name = "Product Video",
            Slug = "product-video",
            Description = "Video giới thiệu sản phẩm sắc nét, tập trung vào chi tiết, chất liệu, tính năng nổi bật của sản phẩm.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        var cat3 = new Category
        {
            Id = Guid.Parse("C0000003-0000-0000-0000-000000000003"),
            Name = "Beauty / Skincare Video",
            Slug = "beauty-skincare-video",
            Description = "Thước phim dịu nhẹ, tone màu tươi sáng tự nhiên, tôn vinh làn da và vẻ đẹp của sản phẩm mỹ phẩm.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        var cat4 = new Category
        {
            Id = Guid.Parse("C0000004-0000-0000-0000-000000000004"),
            Name = "Personal Branding Video",
            Slug = "personal-branding-video",
            Description = "Xây dựng thương hiệu cá nhân qua các video story, phỏng vấn, chia sẻ kinh nghiệm có chiều sâu.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        var cat5 = new Category
        {
            Id = Guid.Parse("C0000005-0000-0000-0000-000000000005"),
            Name = "Ads Video",
            Slug = "ads-video",
            Description = "Video quảng cáo ngắn gọn, thu hút sự chú ý trong 3 giây đầu, thúc đẩy quyết định mua hàng.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        var cat6 = new Category
        {
            Id = Guid.Parse("C0000006-0000-0000-0000-000000000006"),
            Name = "AI Video",
            Slug = "ai-video",
            Description = "Kết hợp các công cụ AI tạo hình ảnh và video hiện đại cùng khả năng edit chuyên nghiệp.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        var cat7 = new Category
        {
            Id = Guid.Parse("C0000007-0000-0000-0000-000000000007"),
            Name = "YouTube Video",
            Slug = "youtube-video",
            Description = "Các video dài, vlog, tài liệu học tập, chia sẻ với bố cục thông tin rõ ràng và âm thanh cuốn hút.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=600&q=80",
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        var cat8 = new Category
        {
            Id = Guid.Parse("C0000008-0000-0000-0000-000000000008"),
            Name = "Event Video",
            Slug = "event-video",
            Description = "Recap các sự kiện, buổi họp mặt, tiệc cưới với nhịp điệu cảm xúc, lưu trữ những khoảnh khắc đẹp nhất.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        // ── Projects ────────────────────────────────────────────
        var proj1 = new Project
        {
            Id = Guid.Parse("A0000001-0000-0000-0000-000000000001"),
            Title = "Beauty Product Short Video",
            Slug = "beauty-product-short-video",
            ShortDescription = "Video ngắn giới thiệu serum phục hồi da, tập trung vào texture căng bóng và hiệu ứng thư thái.",
            Description = "Dự án video ngắn dành cho nhãn hàng GlowSkin nhằm giới thiệu dòng serum mới. Với định hướng tạo ra cảm giác tinh khiết và thư giãn, video tập trung tối đa vào các góc quay cận cảnh giọt serum, độ thẩm thấu trên da và các chuyển cảnh mượt mà kết hợp hiệu ứng âm thanh nhẹ nhàng.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=800&q=80",
            VideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
            CategoryId = cat3.Id,
            ClientName = "GlowSkin Cosmetics",
            ToolsUsed = """["CapCut","Photoshop","Premiere Pro"]""",
            ProjectGoals = "Tăng 50% lượt nhấp chuột mua hàng trên landing page qua kênh TikTok Ads.",
            EditorRole = "Lead Video Editor & Colorist. Xử lý toàn bộ phần cắt ghép, hiệu chỉnh màu sắc sáng trong và sound design thiên nhiên.",
            IsFeatured = true,
            IsPublished = true,
            ProjectDate = new DateTime(2026, 5, 15, 0, 0, 0, DateTimeKind.Utc),
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        var proj2 = new Project
        {
            Id = Guid.Parse("A0000002-0000-0000-0000-000000000002"),
            Title = "TikTok Sales Video",
            Slug = "tiktok-sales-video",
            ShortDescription = "Video bán hàng thời trang đường phố năng động với nhịp điệu nhạc hiphop và chuyển cảnh liên tục.",
            Description = "Một video ngắn 30 giây được thiết kế đặc thù để chạy quảng cáo TikTok cho dòng sản phẩm áo khoác Streetwear mới của FlexWear. Video sử dụng nhịp điệu nhanh, các font chữ hiển thị nổi bật dạng kinetic text và các cú chuyển cảnh theo nhịp beat cực cuốn.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
            VideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
            CategoryId = cat1.Id,
            ClientName = "FlexWear Apparel",
            ToolsUsed = """["Premiere Pro","CapCut","Canva"]""",
            ProjectGoals = "Tạo độ nhận diện cho bộ sưu tập hè và thu hút 100k view tự nhiên trong 3 ngày đầu.",
            EditorRole = "Creative Video Editor. Lên nhịp chuyển cảnh, edit và chọn sound effects tăng tính hành động.",
            IsFeatured = true,
            IsPublished = true,
            ProjectDate = new DateTime(2026, 6, 1, 0, 0, 0, DateTimeKind.Utc),
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        var proj3 = new Project
        {
            Id = Guid.Parse("A0000003-0000-0000-0000-000000000003"),
            Title = "Personal Branding Reel",
            Slug = "personal-branding-reel",
            ShortDescription = "Reel giới thiệu phong cách sống và làm việc của Tech Influencer Minh Đức.",
            Description = "Dự án hợp tác cùng anh Minh Đức để sản xuất một chuỗi video ngắn xây dựng thương hiệu cá nhân trên Facebook Reels và Instagram. Thể hiện hình ảnh một chuyên gia công nghệ trẻ trung, năng động, am hiểu sâu rộng nhưng cực kỳ gần gũi.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
            VideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
            CategoryId = cat4.Id,
            ClientName = "Minh Đức (Tech Influencer)",
            ToolsUsed = """["After Effects","Premiere Pro","Photoshop"]""",
            ProjectGoals = "Truyền tải thông điệp rõ ràng về hành trình số hóa doanh nghiệp, thu hút thêm followers chất lượng.",
            EditorRole = "Offline & Online Editor. Edit thô dựa trên script phỏng vấn, dựng hiệu ứng mô tả pop-up và mix âm thanh.",
            IsFeatured = true,
            IsPublished = true,
            ProjectDate = new DateTime(2026, 4, 20, 0, 0, 0, DateTimeKind.Utc),
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        var proj4 = new Project
        {
            Id = Guid.Parse("A0000004-0000-0000-0000-000000000004"),
            Title = "AI Skincare Video",
            Slug = "ai-skincare-video",
            ShortDescription = "Video concept quảng cáo tương lai sử dụng AI kết hợp kỹ thuật VFX trong After Effects.",
            Description = "Thử nghiệm ứng dụng các mô hình tạo video AI (Runway Gen-2 & Midjourney) để tạo ra các cảnh quay hoa nở siêu thực và nước mát kết hợp cùng các chi tiết bao bì 3D. Đây là hướng đi mới giúp nhãn hàng tiết kiệm tối đa chi phí quay dựng studio thực tế.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
            VideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
            CategoryId = cat6.Id,
            ClientName = "Future Beauty Lab",
            ToolsUsed = """["Midjourney","Runway Gen-2","After Effects","CapCut"]""",
            ProjectGoals = "Minh họa năng lực ứng dụng AI vào việc sản xuất video quảng cáo mẫu cho khách hàng tham khảo.",
            EditorRole = "AI Prompt Engineer & Video Editor. Tạo prompt hình ảnh/video, ghép nối và xử lý âm thanh, đồng bộ nhịp.",
            IsFeatured = false,
            IsPublished = true,
            ProjectDate = new DateTime(2026, 6, 10, 0, 0, 0, DateTimeKind.Utc),
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        var proj5 = new Project
        {
            Id = Guid.Parse("A0000005-0000-0000-0000-000000000005"),
            Title = "Product Ads Video",
            Slug = "product-ads-video",
            ShortDescription = "Video TVC ngắn quảng cáo nước ép trái cây PureJuice mát lạnh ngày hè.",
            Description = "Video thương mại giới thiệu dòng nước ép cam nguyên chất. Tập trung vào âm thanh đá viên va chạm, tiếng rót nước sống động và màu cam rực rỡ thu hút thị giác cực mạnh.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
            VideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
            CategoryId = cat5.Id,
            ClientName = "PureJuice Co.",
            ToolsUsed = """["Premiere Pro","After Effects","Audition"]""",
            ProjectGoals = "Tạo cảm giác sảng khoái kích thích vị giác người xem, thúc đẩy chiến dịch hè.",
            EditorRole = "Video Editor & Sound Designer. Xử lý kĩ xảo slow-motion và đồng bộ tiếng rót nước cực kì thực tế.",
            IsFeatured = false,
            IsPublished = true,
            ProjectDate = new DateTime(2026, 5, 30, 0, 0, 0, DateTimeKind.Utc),
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        // ── Posts ───────────────────────────────────────────────
        var post1 = new Post
        {
            Id = Guid.Parse("B0000001-0000-0000-0000-000000000001"),
            Title = "Cách một video ngắn giúp thương hiệu bán hàng tốt hơn",
            Slug = "cach-video-ngan-giup-thuong-hieu-ban-hang-tot-hon",
            Excerpt = "Tìm hiểu vì sao video dạng ngắn (short-form) lại trở thành công cụ đắc lực nhất giúp tăng tỷ lệ chuyển đổi cho các thương hiệu hiện đại.",
            Content = @"Trong kỷ nguyên số ngày nay, khoảng thời gian chú ý trung bình của người dùng internet đã giảm xuống chỉ còn khoảng **8 giây**. Điều này đặt ra một thách thức vô cùng lớn đối với các thương hiệu khi muốn tiếp cận khách hàng. Video ngắn (TikTok, Reels, Shorts) chính là chìa khóa vàng giải quyết bài toán này.

### 1. Thu hút ngay trong 3 giây đầu tiên
Một video ngắn thành công luôn sở hữu một ""hook"" (yếu tố giữ chân) cực mạnh ngay từ 3 giây đầu. Đó có thể là một câu hỏi gây tò mò, một hình ảnh ấn tượng hoặc một âm thanh bắt tai. Nếu vượt qua 3 giây này, cơ hội khách hàng xem hết video sẽ tăng lên đến 70%.

### 2. Tiết kiệm thời gian, truyền tải nhanh chóng
Thay vì bắt người dùng đọc một bài viết dài hoặc xem video giới thiệu 5 phút, một video 30 giây được dựng thông minh có thể giải thích rõ ràng:
- Sản phẩm giải quyết nỗi đau gì?
- Tại sao nên mua ngay?
- Ưu đãi hấp dẫn hiện tại.

### 3. Thuật toán ưu tiên hiển thị
Các nền tảng mạng xã hội đang dồn toàn bộ lưu lượng (traffic) để đẩy mạnh tính năng Reels, Shorts và TikTok. Một video được dựng chỉn chu, có tính giải trí hoặc mang lại giá trị kiến thức có khả năng tiếp cận hàng triệu người mà không tốn một đồng chi phí quảng cáo.

> **Thảo Quyên's Tip:** Hãy tập trung vào việc tạo ra cảm xúc. Người dùng không mua sản phẩm vì tính năng, họ mua vì cảm xúc mà sản phẩm và video mang lại cho họ.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
            Status = "published",
            PublishedAt = new DateTime(2026, 1, 15, 0, 0, 0, DateTimeKind.Utc),
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        var post2 = new Post
        {
            Id = Guid.Parse("B0000002-0000-0000-0000-000000000002"),
            Title = "Quy trình dựng một video quảng cáo ngắn chuyên nghiệp",
            Slug = "quy-trinh-dung-mot-video-quang-cao-ngan-chuyen-nghiep",
            Excerpt = "Khám phá quy trình chuyên nghiệp đằng sau mỗi giây hình từ khâu lên storyboard, phân loại source, cắt thô đến tinh chỉnh âm thanh, hiệu ứng.",
            Content = @"Nhiều người nghĩ rằng dựng video chỉ là cắt ghép các file quay sẵn lại với nhau. Tuy nhiên, đằng sau một sản phẩm video quảng cáo ngắn triệu view là cả một quy trình kỹ lưỡng và nghiêm túc.

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
Một tone màu đúng sẽ thể hiện đúng cá tính thương hiệu. Skincare cần sáng trong, thời trang cần retro/cá tính, sản phẩm công nghệ cần tone lạnh sang trọng. Cuối cùng, video sẽ được tối ưu hóa xuất ra định dạng dọc chất lượng cao nhất để sẵn sàng đăng tải.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
            Status = "published",
            PublishedAt = new DateTime(2026, 2, 1, 0, 0, 0, DateTimeKind.Utc),
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        var post3 = new Post
        {
            Id = Guid.Parse("B0000003-0000-0000-0000-000000000003"),
            Title = "Vì sao doanh nghiệp nhỏ nên có portfolio video chuyên nghiệp",
            Slug = "vi-sao-doanh-nghiep-nho-nen-co-portfolio-video-chuyen-nghiep",
            Excerpt = "Một portfolio ấn tượng giúp bạn thuyết phục khách hàng dễ dàng hơn. Cùng phân tích tầm quan trọng của video portfolio trong việc xây dựng lòng tin.",
            Content = @"Khách hàng hiện đại không còn tin vào những lời quảng cáo sáo rỗng. Họ muốn thấy thực tế. Đặc biệt đối với các doanh nghiệp vừa và nhỏ, việc sở hữu một kho lưu trữ các video dự án (video portfolio) chất lượng cao là cách nhanh nhất và rẻ nhất để xây dựng niềm tin vững chắc.

### Khách hàng mua bằng mắt
Một portfolio trực quan, trình bày đẹp mắt giống như một showroom lộng lẫy trên internet. Khi khách hàng ghé thăm, họ có thể ngay lập tức xem các sản phẩm thực tế đã được dựng lên trông chuyên nghiệp như thế nào.

### Khẳng định năng lực chuyên môn
Chất lượng dựng video phản ánh thái độ và quy chuẩn làm việc của bạn. Khi bạn có một danh mục các dự án đa dạng từ TikTok, Ads, Beauty đến AI Video, khách hàng sẽ cảm nhận được sự đa năng và kinh nghiệm phong phú.

### Rút ngắn quy trình tư vấn
Thay vì mất nhiều giờ giải thích bạn sẽ dựng video như thế nào, bạn chỉ cần gửi link portfolio các sản phẩm tương tự đã làm. Khách hàng xem xong, ưng ý style và chốt hợp đồng nhanh hơn gấp 3 lần.",
            ThumbnailUrl = "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
            Status = "published",
            PublishedAt = new DateTime(2026, 2, 15, 0, 0, 0, DateTimeKind.Utc),
            CreatedAt = SeedDate,
            UpdatedAt = SeedDate
        };

        // ── Add all seed data ───────────────────────────────────
        context.AdminUsers.Add(admin);
        context.Profiles.Add(profile);
        context.Categories.AddRange(cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8);
        context.Projects.AddRange(proj1, proj2, proj3, proj4, proj5);
        context.Posts.AddRange(post1, post2, post3);

        await context.SaveChangesAsync();
    }
}
