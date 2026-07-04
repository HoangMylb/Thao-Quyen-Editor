using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;
using ThaoQuyenEditor.Api.Services;

namespace ThaoQuyenEditor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly IPostService _postService;

    public PostsController(IPostService postService)
    {
        _postService = postService;
    }

    /// <summary>
    /// GET /api/posts — Get all posts (admin: includes drafts).
    /// </summary>
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<ApiResponse<List<PostResponse>>>> GetAll()
    {
        var posts = await _postService.GetAllAsync();
        return Ok(ApiResponse<List<PostResponse>>.Ok(posts));
    }

    /// <summary>
    /// GET /api/posts/published — Get only published posts (public).
    /// </summary>
    [HttpGet("published")]
    public async Task<ActionResult<ApiResponse<List<PostResponse>>>> GetPublished()
    {
        var posts = await _postService.GetPublishedAsync();
        return Ok(ApiResponse<List<PostResponse>>.Ok(posts));
    }

    /// <summary>
    /// GET /api/posts/latest — Get latest N published posts for homepage.
    /// </summary>
    [HttpGet("latest")]
    public async Task<ActionResult<ApiResponse<List<PostResponse>>>> GetLatest([FromQuery] int take = 3)
    {
        var posts = await _postService.GetLatestAsync(take);
        return Ok(ApiResponse<List<PostResponse>>.Ok(posts));
    }

    /// <summary>
    /// GET /api/posts/{id} — Get post by ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<PostResponse>>> GetById(string id)
    {
        var post = await _postService.GetByIdAsync(id);
        if (post == null)
            return NotFound(ApiResponse<PostResponse>.Fail("Không tìm thấy bài viết."));

        return Ok(ApiResponse<PostResponse>.Ok(post));
    }

    /// <summary>
    /// GET /api/posts/slug/{slug} — Get post by slug (public).
    /// </summary>
    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<ApiResponse<PostResponse>>> GetBySlug(string slug)
    {
        var post = await _postService.GetBySlugAsync(slug);
        if (post == null)
            return NotFound(ApiResponse<PostResponse>.Fail("Không tìm thấy bài viết."));

        return Ok(ApiResponse<PostResponse>.Ok(post));
    }

    /// <summary>
    /// POST /api/posts — Admin: create post.
    /// </summary>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ApiResponse<PostResponse>>> Create([FromBody] PostRequest request)
    {
        var post = await _postService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = post.Id },
            ApiResponse<PostResponse>.Ok(post, "Tạo bài viết thành công."));
    }

    /// <summary>
    /// PUT /api/posts/{id} — Admin: update post.
    /// </summary>
    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<PostResponse>>> Update(string id, [FromBody] PostRequest request)
    {
        var post = await _postService.UpdateAsync(id, request);
        if (post == null)
            return NotFound(ApiResponse<PostResponse>.Fail("Không tìm thấy bài viết."));

        return Ok(ApiResponse<PostResponse>.Ok(post, "Cập nhật bài viết thành công."));
    }

    /// <summary>
    /// DELETE /api/posts/{id} — Admin: delete post.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<object>>> Delete(string id)
    {
        var success = await _postService.DeleteAsync(id);
        if (!success)
            return NotFound(ApiResponse<object>.Fail("Không tìm thấy bài viết."));

        return Ok(ApiResponse<object>.Ok(new { }, "Xóa bài viết thành công."));
    }
}
