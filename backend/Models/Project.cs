namespace ThaoQuyenEditor.Api.Models;

public class Project
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;   // TEXT
    public string ThumbnailUrl { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public Guid CategoryId { get; set; }
    public string ClientName { get; set; } = string.Empty;
    public string ToolsUsed { get; set; } = "[]";             // JSON array stored as string
    public string ProjectGoals { get; set; } = string.Empty;
    public string EditorRole { get; set; } = string.Empty;
    public bool IsFeatured { get; set; }
    public bool IsPublished { get; set; } = true;
    public DateTime ProjectDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Category Category { get; set; } = null!;
}
