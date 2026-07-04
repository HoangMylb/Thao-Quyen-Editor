using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;
using ThaoQuyenEditor.Api.Services;

namespace ThaoQuyenEditor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactMessagesController : ControllerBase
{
    private readonly IContactService _contactService;

    public ContactMessagesController(IContactService contactService)
    {
        _contactService = contactService;
    }

    /// <summary>
    /// GET /api/contactmessages — Admin: get all contact messages.
    /// </summary>
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<ApiResponse<List<ContactMessageResponse>>>> GetAll()
    {
        var messages = await _contactService.GetAllAsync();
        return Ok(ApiResponse<List<ContactMessageResponse>>.Ok(messages));
    }

    /// <summary>
    /// POST /api/contactmessages — Public: submit a contact message.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ApiResponse<ContactMessageResponse>>> Create([FromBody] ContactMessageRequest request)
    {
        var message = await _contactService.CreateAsync(request);
        return CreatedAtAction(nameof(GetAll), null,
            ApiResponse<ContactMessageResponse>.Ok(message, "Gửi tin nhắn thành công! Thảo Quyên sẽ phản hồi trong 24 giờ."));
    }

    /// <summary>
    /// DELETE /api/contactmessages/{id} — Admin: delete a contact message.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<object>>> Delete(string id)
    {
        var success = await _contactService.DeleteAsync(id);
        if (!success)
            return NotFound(ApiResponse<object>.Fail("Không tìm thấy tin nhắn."));

        return Ok(ApiResponse<object>.Ok(new { }, "Xóa tin nhắn thành công."));
    }
}
