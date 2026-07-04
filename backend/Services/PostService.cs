using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ThaoQuyenEditor.Api.Data;
using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;
using ThaoQuyenEditor.Api.Models;

namespace ThaoQuyenEditor.Api.Services;

public class PostService : IPostService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public PostService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<PostResponse>> GetAllAsync()
    {
        var posts = await _context.Posts
            .AsNoTracking()
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return _mapper.Map<List<PostResponse>>(posts);
    }

    public async Task<List<PostResponse>> GetPublishedAsync()
    {
        var posts = await _context.Posts
            .AsNoTracking()
            .Where(p => p.Status == "published")
            .OrderByDescending(p => p.PublishedAt)
            .ToListAsync();

        return _mapper.Map<List<PostResponse>>(posts);
    }

    public async Task<List<PostResponse>> GetLatestAsync(int take = 3)
    {
        var posts = await _context.Posts
            .AsNoTracking()
            .Where(p => p.Status == "published")
            .OrderByDescending(p => p.PublishedAt)
            .Take(take)
            .ToListAsync();

        return _mapper.Map<List<PostResponse>>(posts);
    }

    public async Task<PostResponse?> GetByIdAsync(string id)
    {
        if (!Guid.TryParse(id, out var guid)) return null;

        var post = await _context.Posts
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == guid);
        return post == null ? null : _mapper.Map<PostResponse>(post);
    }

    public async Task<PostResponse?> GetBySlugAsync(string slug)
    {
        var post = await _context.Posts
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Slug == slug);

        return post == null ? null : _mapper.Map<PostResponse>(post);
    }

    public async Task<PostResponse> CreateAsync(PostRequest request)
    {
        var post = _mapper.Map<Post>(request);
        post.Id = Guid.NewGuid();
        post.CreatedAt = DateTime.UtcNow;
        post.UpdatedAt = DateTime.UtcNow;

        if (post.Status == "published" && post.PublishedAt == null)
        {
            post.PublishedAt = DateTime.UtcNow;
        }

        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        return _mapper.Map<PostResponse>(post);
    }

    public async Task<PostResponse?> UpdateAsync(string id, PostRequest request)
    {
        if (!Guid.TryParse(id, out var guid)) return null;

        var post = await _context.Posts.FindAsync(guid);
        if (post == null) return null;

        _mapper.Map(request, post);
        post.UpdatedAt = DateTime.UtcNow;

        if (post.Status == "published" && post.PublishedAt == null)
        {
            post.PublishedAt = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync();

        return _mapper.Map<PostResponse>(post);
    }

    public async Task<bool> DeleteAsync(string id)
    {
        if (!Guid.TryParse(id, out var guid)) return false;

        var post = await _context.Posts.FindAsync(guid);
        if (post == null) return false;

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();

        return true;
    }
}
