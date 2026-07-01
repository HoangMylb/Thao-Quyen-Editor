namespace ThaoQuyenEditor.Api.DTOs.Response;

public class DashboardStatsResponse
{
    public int TotalProjects { get; set; }
    public int TotalCategories { get; set; }
    public int TotalPosts { get; set; }
    public int FeaturedProjectsCount { get; set; }
    public int PublishedPostsCount { get; set; }
    public int DraftPostsCount { get; set; }
}
