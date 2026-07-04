namespace ThaoQuyenEditor.Api.DTOs.Response;

public class StorageHealthResponse
{
    public string Provider { get; set; } = "supabase";
    public bool Configured { get; set; }
    public bool BucketPublicUrlReachable { get; set; }
    public string Bucket { get; set; } = string.Empty;
    public string PublicUrlSample { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}
