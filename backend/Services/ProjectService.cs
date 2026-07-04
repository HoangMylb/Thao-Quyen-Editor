using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ThaoQuyenEditor.Api.Data;
using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;
using ThaoQuyenEditor.Api.Models;

namespace ThaoQuyenEditor.Api.Services;

public class ProjectService : IProjectService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ProjectService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ProjectResponse>> GetAllAsync()
    {
        var projects = await _context.Projects
            .AsNoTracking()
            .Include(p => p.Category)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return _mapper.Map<List<ProjectResponse>>(projects);
    }

    public async Task<ProjectResponse?> GetByIdAsync(string id)
    {
        if (!Guid.TryParse(id, out var guid)) return null;

        var project = await _context.Projects
            .AsNoTracking()
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == guid);

        return project == null ? null : _mapper.Map<ProjectResponse>(project);
    }

    public async Task<ProjectResponse?> GetBySlugAsync(string slug)
    {
        var project = await _context.Projects
            .AsNoTracking()
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Slug == slug);

        return project == null ? null : _mapper.Map<ProjectResponse>(project);
    }

    public async Task<ProjectResponse> CreateAsync(ProjectRequest request)
    {
        var project = _mapper.Map<Project>(request);
        project.Id = Guid.NewGuid();
        project.CreatedAt = DateTime.UtcNow;
        project.UpdatedAt = DateTime.UtcNow;

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        // Reload with category
        await _context.Entry(project).Reference(p => p.Category).LoadAsync();

        return _mapper.Map<ProjectResponse>(project);
    }

    public async Task<ProjectResponse?> UpdateAsync(string id, ProjectRequest request)
    {
        if (!Guid.TryParse(id, out var guid)) return null;

        var project = await _context.Projects
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == guid);

        if (project == null) return null;

        _mapper.Map(request, project);
        project.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return _mapper.Map<ProjectResponse>(project);
    }

    public async Task<bool> DeleteAsync(string id)
    {
        if (!Guid.TryParse(id, out var guid)) return false;

        var project = await _context.Projects.FindAsync(guid);
        if (project == null) return false;

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<List<ProjectResponse>> GetFeaturedAsync()
    {
        var projects = await _context.Projects
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => p.IsFeatured && p.IsPublished)
            .OrderByDescending(p => p.ProjectDate)
            .Take(6)
            .ToListAsync();

        return _mapper.Map<List<ProjectResponse>>(projects);
    }

    public async Task<List<ProjectResponse>> GetByCategoryAsync(string categoryId)
    {
        if (!Guid.TryParse(categoryId, out var guid))
            return new List<ProjectResponse>();

        var projects = await _context.Projects
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => p.CategoryId == guid && p.IsPublished)
            .OrderByDescending(p => p.ProjectDate)
            .ToListAsync();

        return _mapper.Map<List<ProjectResponse>>(projects);
    }

    public async Task<List<ProjectResponse>> GetRelatedAsync(string projectId, int take = 3)
    {
        if (!Guid.TryParse(projectId, out var guid))
            return new List<ProjectResponse>();

        take = Math.Clamp(take, 1, 12);

        var project = await _context.Projects.FindAsync(guid);
        if (project == null) return new List<ProjectResponse>();

        var related = await _context.Projects
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => p.CategoryId == project.CategoryId && p.Id != guid && p.IsPublished)
            .OrderByDescending(p => p.ProjectDate)
            .Take(take)
            .ToListAsync();

        return _mapper.Map<List<ProjectResponse>>(related);
    }
}
