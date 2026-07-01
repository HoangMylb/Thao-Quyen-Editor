using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;

namespace ThaoQuyenEditor.Api.Services;

public interface IProfileService
{
    Task<ProfileResponse> GetProfileAsync();
    Task<ProfileResponse> UpdateProfileAsync(ProfileRequest request);
}
