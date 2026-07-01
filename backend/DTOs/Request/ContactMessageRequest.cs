namespace ThaoQuyenEditor.Api.DTOs.Request;

public class ContactMessageRequest
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string ProjectType { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}
