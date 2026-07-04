using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;
using ThaoQuyenEditor.Api.Services;

namespace ThaoQuyenEditor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    /// <summary>
    /// GET /api/projects — Get all projects (public).
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<ProjectResponse>>>> GetAll()
    {
        var projects = await _projectService.GetAllAsync();
        return Ok(ApiResponse<List<ProjectResponse>>.Ok(projects));
    }

    /// <summary>
    /// GET /api/projects/featured — Get featured projects for homepage.
    /// </summary>
    [HttpGet("featured")]
    public async Task<ActionResult<ApiResponse<List<ProjectResponse>>>> GetFeatured()
    {
        var projects = await _projectService.GetFeaturedAsync();
        return Ok(ApiResponse<List<ProjectResponse>>.Ok(projects));
    }

    /// <summary>
    /// GET /api/projects/by-category/{categoryId} — Get projects in a category.
    /// </summary>
    [HttpGet("by-category/{categoryId}")]
    public async Task<ActionResult<ApiResponse<List<ProjectResponse>>>> GetByCategory(string categoryId)
    {
        var projects = await _projectService.GetByCategoryAsync(categoryId);
        return Ok(ApiResponse<List<ProjectResponse>>.Ok(projects));
    }

    /// <summary>
    /// GET /api/projects/related/{projectId} — Get related projects (same category, exclude self).
    /// </summary>
    [HttpGet("related/{projectId}")]
    public async Task<ActionResult<ApiResponse<List<ProjectResponse>>>> GetRelated(string projectId, [FromQuery] int take = 3)
    {
        var projects = await _projectService.GetRelatedAsync(projectId, take);
        return Ok(ApiResponse<List<ProjectResponse>>.Ok(projects));
    }

    /// <summary>
    /// GET /api/projects/{id} — Get project by ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<ProjectResponse>>> GetById(string id)
    {
        var project = await _projectService.GetByIdAsync(id);
        if (project == null)
            return NotFound(ApiResponse<ProjectResponse>.Fail("Không tìm thấy dự án."));

        return Ok(ApiResponse<ProjectResponse>.Ok(project));
    }

    /// <summary>
    /// GET /api/projects/slug/{slug} — Get project by slug (public).
    /// </summary>
    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<ApiResponse<ProjectResponse>>> GetBySlug(string slug)
    {
        var project = await _projectService.GetBySlugAsync(slug);
        if (project == null)
            return NotFound(ApiResponse<ProjectResponse>.Fail("Không tìm thấy dự án."));

        return Ok(ApiResponse<ProjectResponse>.Ok(project));
    }

    /// <summary>
    /// POST /api/projects — Admin: create project.
    /// </summary>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ApiResponse<ProjectResponse>>> Create([FromBody] ProjectRequest request)
    {
        var project = await _projectService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = project.Id },
            ApiResponse<ProjectResponse>.Ok(project, "Tạo dự án thành công."));
    }

    /// <summary>
    /// PUT /api/projects/{id} — Admin: update project.
    /// </summary>
    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<ProjectResponse>>> Update(string id, [FromBody] ProjectRequest request)
    {
        var project = await _projectService.UpdateAsync(id, request);
        if (project == null)
            return NotFound(ApiResponse<ProjectResponse>.Fail("Không tìm thấy dự án."));

        return Ok(ApiResponse<ProjectResponse>.Ok(project, "Cập nhật dự án thành công."));
    }

    /// <summary>
    /// DELETE /api/projects/{id} — Admin: delete project.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<object>>> Delete(string id)
    {
        var success = await _projectService.DeleteAsync(id);
        if (!success)
            return NotFound(ApiResponse<object>.Fail("Không tìm thấy dự án."));

        return Ok(ApiResponse<object>.Ok(new { }, "Xóa dự án thành công."));
    }
}
