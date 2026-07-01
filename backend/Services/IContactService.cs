using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;

namespace ThaoQuyenEditor.Api.Services;

public interface IContactService
{
    Task<List<ContactMessageResponse>> GetAllAsync();
    Task<ContactMessageResponse> CreateAsync(ContactMessageRequest request);
    Task<bool> DeleteAsync(string id);
}
