using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ThaoQuyenEditor.Api.DTOs.Response;
using ThaoQuyenEditor.Api.Services;

namespace ThaoQuyenEditor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    /// <summary>
    /// GET /api/dashboard/stats — Admin: get dashboard statistics.
    /// </summary>
    [HttpGet("stats")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<DashboardStatsResponse>>> GetStats()
    {
        var stats = await _dashboardService.GetStatsAsync();
        return Ok(ApiResponse<DashboardStatsResponse>.Ok(stats));
    }
}
