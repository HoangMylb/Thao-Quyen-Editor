using ThaoQuyenEditor.Api.DTOs.Response;

namespace ThaoQuyenEditor.Api.Services;

public interface IFileStorageService
{
    Task<(string Url, string FileName, string ContentType, long Size)> SaveAsync(IFormFile file, string folder, CancellationToken cancellationToken = default);
    Task<StorageHealthResponse> GetHealthAsync(CancellationToken cancellationToken = default);
}
