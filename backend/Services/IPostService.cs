using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;

namespace ThaoQuyenEditor.Api.Services;

public interface IPostService
{
    Task<List<PostResponse>> GetAllAsync();
    Task<List<PostResponse>> GetPublishedAsync();
    Task<List<PostResponse>> GetLatestAsync(int take = 3);
    Task<PostResponse?> GetByIdAsync(string id);
    Task<PostResponse?> GetBySlugAsync(string slug);
    Task<PostResponse> CreateAsync(PostRequest request);
    Task<PostResponse?> UpdateAsync(string id, PostRequest request);
    Task<bool> DeleteAsync(string id);
}
