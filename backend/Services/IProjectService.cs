using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;

namespace ThaoQuyenEditor.Api.Services;

public interface IProjectService
{
    Task<List<ProjectResponse>> GetAllAsync();
    Task<ProjectResponse?> GetByIdAsync(string id);
    Task<ProjectResponse?> GetBySlugAsync(string slug);
    Task<ProjectResponse> CreateAsync(ProjectRequest request);
    Task<ProjectResponse?> UpdateAsync(string id, ProjectRequest request);
    Task<bool> DeleteAsync(string id);
    Task<List<ProjectResponse>> GetFeaturedAsync();
    Task<List<ProjectResponse>> GetByCategoryAsync(string categoryId);
    Task<List<ProjectResponse>> GetRelatedAsync(string projectId, int take = 3);
}
