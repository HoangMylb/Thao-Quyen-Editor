namespace ThaoQuyenEditor.Api.Models;

public class ContactMessage
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string ProjectType { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;   // TEXT
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
