using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ThaoQuyenEditor.Api.Data;
using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;
using ThaoQuyenEditor.Api.Models;

namespace ThaoQuyenEditor.Api.Services;

public class CategoryService : ICategoryService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public CategoryService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<CategoryResponse>> GetAllAsync()
    {
        var categories = await _context.Categories
            .AsNoTracking()
            .Include(c => c.Projects)
            .OrderBy(c => c.Name)
            .ToListAsync();

        return _mapper.Map<List<CategoryResponse>>(categories);
    }

    public async Task<CategoryResponse?> GetByIdAsync(string id)
    {
        if (!Guid.TryParse(id, out var guid)) return null;

        var category = await _context.Categories
            .AsNoTracking()
            .Include(c => c.Projects)
            .FirstOrDefaultAsync(c => c.Id == guid);

        return category == null ? null : _mapper.Map<CategoryResponse>(category);
    }

    public async Task<CategoryResponse?> GetBySlugAsync(string slug)
    {
        var category = await _context.Categories
            .AsNoTracking()
            .Include(c => c.Projects)
            .FirstOrDefaultAsync(c => c.Slug == slug);

        return category == null ? null : _mapper.Map<CategoryResponse>(category);
    }

    public async Task<CategoryResponse> CreateAsync(CategoryRequest request)
    {
        var category = _mapper.Map<Category>(request);
        category.Id = Guid.NewGuid();
        category.CreatedAt = DateTime.UtcNow;
        category.UpdatedAt = DateTime.UtcNow;

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return _mapper.Map<CategoryResponse>(category);
    }

    public async Task<CategoryResponse?> UpdateAsync(string id, CategoryRequest request)
    {
        if (!Guid.TryParse(id, out var guid)) return null;

        var category = await _context.Categories.FindAsync(guid);
        if (category == null) return null;

        _mapper.Map(request, category);
        category.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return _mapper.Map<CategoryResponse>(category);
    }

    public async Task<bool> DeleteAsync(string id)
    {
        if (!Guid.TryParse(id, out var guid)) return false;

        var category = await _context.Categories
            .Include(c => c.Projects)
            .FirstOrDefaultAsync(c => c.Id == guid);

        if (category == null) return false;

        if (category.Projects.Any())
        {
            throw new InvalidOperationException(
                "Không thể xóa category này vì vẫn còn các video project thuộc danh mục này.");
        }

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return true;
    }
}
