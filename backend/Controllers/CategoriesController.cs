using Microsoft.AspNetCore.Mvc;
using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;
using ThaoQuyenEditor.Api.Services;

namespace ThaoQuyenEditor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    /// <summary>
    /// GET /api/categories — Get all categories (public).
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<CategoryResponse>>>> GetAll()
    {
        var categories = await _categoryService.GetAllAsync();
        return Ok(ApiResponse<List<CategoryResponse>>.Ok(categories));
    }

    /// <summary>
    /// GET /api/categories/{id} — Get category by ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<CategoryResponse>>> GetById(string id)
    {
        var category = await _categoryService.GetByIdAsync(id);
        if (category == null)
            return NotFound(ApiResponse<CategoryResponse>.Fail("Không tìm thấy danh mục."));

        return Ok(ApiResponse<CategoryResponse>.Ok(category));
    }

    /// <summary>
    /// GET /api/categories/slug/{slug} — Get category by slug (public).
    /// </summary>
    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<ApiResponse<CategoryResponse>>> GetBySlug(string slug)
    {
        var category = await _categoryService.GetBySlugAsync(slug);
        if (category == null)
            return NotFound(ApiResponse<CategoryResponse>.Fail("Không tìm thấy danh mục."));

        return Ok(ApiResponse<CategoryResponse>.Ok(category));
    }

    /// <summary>
    /// POST /api/categories — Admin: create category.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ApiResponse<CategoryResponse>>> Create([FromBody] CategoryRequest request)
    {
        var category = await _categoryService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = category.Id },
            ApiResponse<CategoryResponse>.Ok(category, "Tạo danh mục thành công."));
    }

    /// <summary>
    /// PUT /api/categories/{id} — Admin: update category.
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<CategoryResponse>>> Update(string id, [FromBody] CategoryRequest request)
    {
        var category = await _categoryService.UpdateAsync(id, request);
        if (category == null)
            return NotFound(ApiResponse<CategoryResponse>.Fail("Không tìm thấy danh mục."));

        return Ok(ApiResponse<CategoryResponse>.Ok(category, "Cập nhật danh mục thành công."));
    }

    /// <summary>
    /// DELETE /api/categories/{id} — Admin: delete category (fails if projects exist).
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(string id)
    {
        try
        {
            var success = await _categoryService.DeleteAsync(id);
            if (!success)
                return NotFound(ApiResponse<object>.Fail("Không tìm thấy danh mục."));

            return Ok(ApiResponse<object>.Ok(new { }, "Xóa danh mục thành công."));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ApiResponse<object>.Fail(ex.Message));
        }
    }
}
