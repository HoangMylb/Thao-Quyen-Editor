using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;
using ThaoQuyenEditor.Api.Services;

namespace ThaoQuyenEditor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly IProfileService _profileService;

    public ProfileController(IProfileService profileService)
    {
        _profileService = profileService;
    }

    /// <summary>
    /// GET /api/profile — Public: get profile info.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<ProfileResponse>>> GetProfile()
    {
        var profile = await _profileService.GetProfileAsync();
        return Ok(ApiResponse<ProfileResponse>.Ok(profile));
    }

    /// <summary>
    /// PUT /api/profile — Admin: update profile.
    /// </summary>
    [HttpPut]
    [Authorize]
    public async Task<ActionResult<ApiResponse<ProfileResponse>>> UpdateProfile([FromBody] ProfileRequest request)
    {
        var profile = await _profileService.UpdateProfileAsync(request);
        return Ok(ApiResponse<ProfileResponse>.Ok(profile, "Cập nhật profile thành công."));
    }
}
