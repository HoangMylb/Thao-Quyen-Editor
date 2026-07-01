namespace ThaoQuyenEditor.Api.DTOs.Request;

public class ProfileRequest
{
    public string FullName { get; set; } = string.Empty;
    public string Headline { get; set; } = string.Empty;
    public string ShortBio { get; set; } = string.Empty;
    public string AboutContent { get; set; } = string.Empty;
    public string AvatarUrl { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string ZaloUrl { get; set; } = string.Empty;
    public string FacebookUrl { get; set; } = string.Empty;
    public string TiktokUrl { get; set; } = string.Empty;
    public string InstagramUrl { get; set; } = string.Empty;
    public string YoutubeUrl { get; set; } = string.Empty;
    public string CtaText { get; set; } = string.Empty;
    public bool ShowHero { get; set; }
    public bool ShowFeatured { get; set; }
    public bool ShowCategories { get; set; }
    public bool ShowWorkflow { get; set; }
    public bool ShowStats { get; set; }
    public bool ShowBlogs { get; set; }
    public bool ShowContact { get; set; }
    public string FeaturedTitle { get; set; } = string.Empty;
    public string CategoriesTitle { get; set; } = string.Empty;
    public string BlogsTitle { get; set; } = string.Empty;
    public string HeroBgType { get; set; } = "color";
    public string HeroBgUrl { get; set; } = string.Empty;
    public string? HeroVideoProjectId { get; set; }
    public List<string> HomepageFeaturedProjectIds { get; set; } = new();
    public List<string> HomepageCategoryIds { get; set; } = new();
}
