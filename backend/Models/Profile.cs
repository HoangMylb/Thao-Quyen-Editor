namespace ThaoQuyenEditor.Api.Models;

public class Profile
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Headline { get; set; } = string.Empty;
    public string ShortBio { get; set; } = string.Empty;
    public string AboutContent { get; set; } = string.Empty;   // TEXT column
    public string AvatarUrl { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string ZaloUrl { get; set; } = string.Empty;
    public string FacebookUrl { get; set; } = string.Empty;
    public string TiktokUrl { get; set; } = string.Empty;
    public string InstagramUrl { get; set; } = string.Empty;
    public string YoutubeUrl { get; set; } = string.Empty;
    public string CtaText { get; set; } = string.Empty;
    public bool ShowHero { get; set; } = true;
    public bool ShowFeatured { get; set; } = true;
    public bool ShowCategories { get; set; } = true;
    public bool ShowWorkflow { get; set; } = true;
    public bool ShowStats { get; set; } = true;
    public bool ShowBlogs { get; set; } = true;
    public bool ShowContact { get; set; } = true;
    public string FeaturedTitle { get; set; } = string.Empty;
    public string CategoriesTitle { get; set; } = string.Empty;
    public string BlogsTitle { get; set; } = string.Empty;
    public string HeroBgType { get; set; } = "color";        // "color" | "image" | "video"
    public string HeroBgUrl { get; set; } = string.Empty;
    public Guid? HeroVideoProjectId { get; set; }
    public string HomepageFeaturedProjectIds { get; set; } = "[]";  // JSON array stored as string
    public string HomepageCategoryIds { get; set; } = "[]";         // JSON array stored as string
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
