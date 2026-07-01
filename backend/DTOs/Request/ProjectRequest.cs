namespace ThaoQuyenEditor.Api.DTOs.Request;

public class ProjectRequest
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public string CategoryId { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
    public List<string> ToolsUsed { get; set; } = new();
    public string ProjectGoals { get; set; } = string.Empty;
    public string EditorRole { get; set; } = string.Empty;
    public bool IsFeatured { get; set; }
    public bool IsPublished { get; set; } = true;
    public string ProjectDate { get; set; } = string.Empty;
}
