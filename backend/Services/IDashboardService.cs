using ThaoQuyenEditor.Api.DTOs.Response;

namespace ThaoQuyenEditor.Api.Services;

public interface IDashboardService
{
    Task<DashboardStatsResponse> GetStatsAsync();
}
