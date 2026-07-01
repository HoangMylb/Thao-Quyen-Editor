using Microsoft.EntityFrameworkCore;
using ThaoQuyenEditor.Api.Data;
using ThaoQuyenEditor.Api.DTOs.Response;

namespace ThaoQuyenEditor.Api.Services;

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _context;

    public DashboardService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardStatsResponse> GetStatsAsync()
    {
        var totalProjects = await _context.Projects.CountAsync();
        var totalCategories = await _context.Categories.CountAsync();
        var totalPosts = await _context.Posts.CountAsync();
        var featuredProjectsCount = await _context.Projects.CountAsync(p => p.IsFeatured);
        var publishedPostsCount = await _context.Posts.CountAsync(p => p.Status == "published");
        var draftPostsCount = totalPosts - publishedPostsCount;

        return new DashboardStatsResponse
        {
            TotalProjects = totalProjects,
            TotalCategories = totalCategories,
            TotalPosts = totalPosts,
            FeaturedProjectsCount = featuredProjectsCount,
            PublishedPostsCount = publishedPostsCount,
            DraftPostsCount = draftPostsCount
        };
    }
}
