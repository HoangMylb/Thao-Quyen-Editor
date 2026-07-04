using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThaoQuyenEditor.Api.DTOs.Response;
using ThaoQuyenEditor.Api.Services;

namespace ThaoQuyenEditor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadsController : ControllerBase
{
    private readonly IFileStorageService _fileStorageService;

    public UploadsController(IFileStorageService fileStorageService)
    {
        _fileStorageService = fileStorageService;
    }

    [HttpPost("video")]
    [Authorize]
    [RequestSizeLimit(220 * 1024 * 1024)]
    [RequestFormLimits(MultipartBodyLengthLimit = 220 * 1024 * 1024)]
    public async Task<ActionResult<ApiResponse<UploadedFileResponse>>> UploadVideo([FromForm] IFormFile file, [FromForm] string? folder, CancellationToken cancellationToken)
    {
        if (file == null)
            return BadRequest(ApiResponse<UploadedFileResponse>.Fail("Thiếu file upload."));

        (string Url, string FileName, string ContentType, long Size) result;
        try
        {
            result = await _fileStorageService.SaveAsync(file, folder ?? "videos", cancellationToken);
        }
        catch (StorageServiceException ex)
        {
            return BadRequest(ApiResponse<UploadedFileResponse>.Fail(ex.Message));
        }

        return Ok(ApiResponse<UploadedFileResponse>.Ok(new UploadedFileResponse
        {
            Url = result.Url,
            FileName = result.FileName,
            ContentType = result.ContentType,
            Size = result.Size,
        }, "Upload video thành công."));
    }
}
