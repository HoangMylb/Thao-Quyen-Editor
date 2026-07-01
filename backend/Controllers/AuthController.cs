using Microsoft.AspNetCore.Mvc;
using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;
using ThaoQuyenEditor.Api.Services;
using Microsoft.AspNetCore.Authorization;

namespace ThaoQuyenEditor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// POST /api/auth/login — Authenticate admin user and return JWT token.
    /// </summary>
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<LoginResponse>>> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);

        if (!result.Success)
        {
            return Unauthorized(ApiResponse<LoginResponse>.Fail(result.Message));
        }

        return Ok(ApiResponse<LoginResponse>.Ok(result, "Đăng nhập thành công."));
    }

    /// <summary>
    /// POST /api/auth/change-password — Change admin password (requires auth).
    /// </summary>
    [HttpPost("change-password")]
    public async Task<ActionResult<ApiResponse<object>>> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        var userId = HttpContext.Items["UserId"]?.ToString();
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized(ApiResponse<object>.Fail("Chưa xác thực."));
        }

        var success = await _authService.ChangePasswordAsync(request, userId);
        if (!success)
        {
            return BadRequest(ApiResponse<object>.Fail("Mật khẩu hiện tại không đúng."));
        }

        return Ok(ApiResponse<object>.Ok(new { }, "Đổi mật khẩu thành công."));
    }
}
