using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Options;
using ThaoQuyenEditor.Api.Config;
using ThaoQuyenEditor.Api.DTOs.Response;

namespace ThaoQuyenEditor.Api.Services;

public class FileStorageService : IFileStorageService
{
    private static readonly HashSet<string> AllowedVideoTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "video/mp4",
        "video/webm",
        "video/quicktime",
        "video/x-msvideo",
        "video/x-matroska",
        "video/mpeg",
        "video/ogg"
    };

    private readonly HttpClient _httpClient;
    private readonly FileExtensionContentTypeProvider _contentTypeProvider = new();
    private readonly SupabaseOptions _options;

    public FileStorageService(HttpClient httpClient, IOptions<SupabaseOptions> options)
    {
        _httpClient = httpClient;
        _options = options.Value;
    }

    public async Task<(string Url, string FileName, string ContentType, long Size)> SaveAsync(IFormFile file, string folder, CancellationToken cancellationToken = default)
    {
        EnsureConfigured();

        if (file.Length <= 0)
            throw new StorageServiceException("File rỗng.");

        if (file.Length > 200 * 1024 * 1024)
            throw new StorageServiceException("Video vượt quá giới hạn 200MB.");

        var contentType = file.ContentType?.Trim() ?? string.Empty;
        var extension = Path.GetExtension(file.FileName);

        if (string.IsNullOrWhiteSpace(extension) || !_contentTypeProvider.TryGetContentType($"file{extension}", out var inferredType))
            throw new StorageServiceException("Không xác định được định dạng file.");

        if (!AllowedVideoTypes.Contains(contentType) && !AllowedVideoTypes.Contains(inferredType))
            throw new StorageServiceException("Chỉ hỗ trợ file video phổ biến.");

        var resolvedType = string.IsNullOrWhiteSpace(contentType) ? inferredType : contentType;
        var safeFolder = string.IsNullOrWhiteSpace(folder) ? "videos" : folder.Trim().ToLowerInvariant();
        var fileName = $"{DateTime.UtcNow:yyyyMMddHHmmssfff}-{Guid.NewGuid():N}{extension.ToLowerInvariant()}";
        var objectPath = $"{safeFolder}/{fileName}";
        var uploadUrl = $"{BaseUrl}/storage/v1/object/{Bucket}/{objectPath}";

        await using var input = file.OpenReadStream();
        using var request = new HttpRequestMessage(HttpMethod.Post, uploadUrl)
        {
            Content = new StreamContent(input)
        };

        request.Headers.TryAddWithoutValidation("apikey", ServiceRoleKey);
        request.Headers.TryAddWithoutValidation("Authorization", $"Bearer {ServiceRoleKey}");
        request.Headers.TryAddWithoutValidation("x-upsert", "false");
        request.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(resolvedType);

        using var response = await _httpClient.SendAsync(request, cancellationToken);
        var responseBody = await response.Content.ReadAsStringAsync(cancellationToken);
        if (!response.IsSuccessStatusCode)
            throw BuildUploadException(response.StatusCode, responseBody);

        var publicUrl = $"{BaseUrl}/storage/v1/object/public/{Bucket}/{objectPath}";
        return (publicUrl, fileName, resolvedType, file.Length);
    }

    public async Task<StorageHealthResponse> GetHealthAsync(CancellationToken cancellationToken = default)
    {
        var configured = IsConfigured();
        var sampleUrl = configured ? $"{BaseUrl}/storage/v1/object/public/{Bucket}/health-check.txt" : string.Empty;

        if (!configured)
        {
            return new StorageHealthResponse
            {
                Configured = false,
                Bucket = Bucket,
                PublicUrlSample = sampleUrl,
                BucketPublicUrlReachable = false,
                Message = "Thiếu cấu hình Supabase Storage: Supabase__Url hoặc Supabase__ServiceRoleKey hoặc Supabase__StorageBucket."
            };
        }

        using var request = new HttpRequestMessage(HttpMethod.Head, sampleUrl);
        using var response = await _httpClient.SendAsync(request, cancellationToken);

        var bucketPublicUrlReachable = response.StatusCode is HttpStatusCode.NotFound or HttpStatusCode.OK;

        return new StorageHealthResponse
        {
            Configured = true,
            Bucket = Bucket,
            PublicUrlSample = sampleUrl,
            BucketPublicUrlReachable = bucketPublicUrlReachable,
            Message = bucketPublicUrlReachable
                ? "Cấu hình Supabase Storage có vẻ hợp lệ. Nếu upload vẫn lỗi, kiểm tra service role key và bucket tồn tại."
                : "Public URL không truy cập được. Hãy kiểm tra bucket có tồn tại và đã bật public hay chưa."
        };
    }

    private bool IsConfigured()
        => !string.IsNullOrWhiteSpace(BaseUrl)
           && !string.IsNullOrWhiteSpace(ServiceRoleKey)
           && !string.IsNullOrWhiteSpace(Bucket);

    private void EnsureConfigured()
    {
        if (!IsConfigured())
            throw new StorageServiceException("Thiếu cấu hình Supabase Storage. Cần Supabase__Url, Supabase__ServiceRoleKey, Supabase__StorageBucket.");
    }

    private StorageServiceException BuildUploadException(HttpStatusCode statusCode, string responseBody)
    {
        var normalizedBody = responseBody.ToLowerInvariant();
        var detail = ExtractErrorDetail(responseBody);

        if (statusCode is HttpStatusCode.Unauthorized or HttpStatusCode.Forbidden)
        {
            return new StorageServiceException(
                $"Supabase từ chối upload. Kiểm tra Supabase__ServiceRoleKey có đúng và còn quyền storage hay không. Chi tiết: {detail}",
                (int)statusCode);
        }

        if (statusCode == HttpStatusCode.NotFound || normalizedBody.Contains("bucket") || normalizedBody.Contains("not found"))
        {
            return new StorageServiceException(
                $"Không tìm thấy bucket Supabase '{Bucket}'. Hãy tạo bucket và kiểm tra tên trong Supabase__StorageBucket. Chi tiết: {detail}",
                (int)statusCode);
        }

        if (statusCode == HttpStatusCode.BadRequest && normalizedBody.Contains("mime"))
        {
            return new StorageServiceException(
                $"Supabase từ chối định dạng video này. Chi tiết: {detail}",
                (int)statusCode);
        }

        return new StorageServiceException(
            $"Upload Supabase thất bại. Kiểm tra bucket có public, service role key đúng, và cấu hình storage hợp lệ. Chi tiết: {detail}",
            (int)statusCode);
    }

    private static string ExtractErrorDetail(string responseBody)
    {
        if (string.IsNullOrWhiteSpace(responseBody))
            return "Không có phản hồi chi tiết từ Supabase.";

        try
        {
            using var doc = JsonDocument.Parse(responseBody);
            var root = doc.RootElement;
            if (root.ValueKind == JsonValueKind.Object)
            {
                foreach (var key in new[] { "message", "error", "msg" })
                {
                    if (root.TryGetProperty(key, out var value) && value.ValueKind == JsonValueKind.String)
                        return value.GetString() ?? responseBody;
                }
            }
        }
        catch
        {
        }

        return responseBody;
    }

    private string BaseUrl => _options.Url.TrimEnd('/');
    private string ServiceRoleKey => _options.ServiceRoleKey;
    private string Bucket => _options.StorageBucket;
}
