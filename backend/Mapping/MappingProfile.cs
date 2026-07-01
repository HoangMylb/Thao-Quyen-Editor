using AutoMapper;
using ThaoQuyenEditor.Api.Models;
using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;
using System.Text.Json;

namespace ThaoQuyenEditor.Api.Mapping;

// Use alias to disambiguate Models.Profile from AutoMapper.Profile
using ProfileModel = ThaoQuyenEditor.Api.Models.Profile;

public class MappingProfile : AutoMapper.Profile
{
    public MappingProfile()
    {
        // Profile ←→ ProfileRequest
        CreateMap<ProfileRequest, ProfileModel>()
            .ForMember(dest => dest.HomepageFeaturedProjectIds,
                opt => opt.MapFrom(src => SerializeJson(src.HomepageFeaturedProjectIds)))
            .ForMember(dest => dest.HomepageCategoryIds,
                opt => opt.MapFrom(src => SerializeJson(src.HomepageCategoryIds)))
            .ForMember(dest => dest.HeroVideoProjectId,
                opt => opt.MapFrom(src =>
                    string.IsNullOrEmpty(src.HeroVideoProjectId) ? (Guid?)null : Guid.Parse(src.HeroVideoProjectId)));

        CreateMap<ProfileModel, ProfileResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
            .ForMember(dest => dest.HeroVideoProjectId,
                opt => opt.MapFrom(src => src.HeroVideoProjectId.HasValue ? src.HeroVideoProjectId.Value.ToString() : null))
            .ForMember(dest => dest.HomepageFeaturedProjectIds,
                opt => opt.MapFrom(src => DeserializeJsonList(src.HomepageFeaturedProjectIds)))
            .ForMember(dest => dest.HomepageCategoryIds,
                opt => opt.MapFrom(src => DeserializeJsonList(src.HomepageCategoryIds)))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt.ToString("o")))
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => src.UpdatedAt.ToString("o")));

        // Category ←→ CategoryRequest
        CreateMap<CategoryRequest, Category>();

        CreateMap<Category, CategoryResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
            .ForMember(dest => dest.ProjectCount, opt => opt.MapFrom(src => src.Projects.Count))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt.ToString("o")))
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => src.UpdatedAt.ToString("o")));

        // Project ←→ ProjectRequest
        CreateMap<ProjectRequest, Project>()
            .ForMember(dest => dest.ToolsUsed,
                opt => opt.MapFrom(src => SerializeJson(src.ToolsUsed)))
            .ForMember(dest => dest.CategoryId,
                opt => opt.MapFrom(src => Guid.Parse(src.CategoryId)))
            .ForMember(dest => dest.ProjectDate,
                opt => opt.MapFrom(src => DateOnly.Parse(src.ProjectDate).ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc)));

        CreateMap<Project, ProjectResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
            .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.CategoryId.ToString()))
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.CategorySlug, opt => opt.MapFrom(src => src.Category.Slug))
            .ForMember(dest => dest.ToolsUsed,
                opt => opt.MapFrom(src => DeserializeJsonList(src.ToolsUsed)))
            .ForMember(dest => dest.ProjectDate,
                opt => opt.MapFrom(src => src.ProjectDate.ToString("yyyy-MM-dd")))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt.ToString("o")))
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => src.UpdatedAt.ToString("o")));

        // Post ←→ PostRequest
        CreateMap<PostRequest, Post>()
            .ForMember(dest => dest.PublishedAt,
                opt => opt.MapFrom(src =>
                    !string.IsNullOrEmpty(src.PublishedAt) ? DateTime.Parse(src.PublishedAt).ToUniversalTime() : (DateTime?)null));

        CreateMap<Post, PostResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
            .ForMember(dest => dest.PublishedAt,
                opt => opt.MapFrom(src => src.PublishedAt.HasValue ? src.PublishedAt.Value.ToString("o") : null))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt.ToString("o")))
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => src.UpdatedAt.ToString("o")));

        // ContactMessage ←→ ContactMessageRequest
        CreateMap<ContactMessageRequest, ContactMessage>();

        CreateMap<ContactMessage, ContactMessageResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt.ToString("o")));
    }

    private static string SerializeJson(List<string> list)
    {
        return JsonSerializer.Serialize(list);
    }

    private static List<string> DeserializeJsonList(string json)
    {
        try
        {
            return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
        }
        catch
        {
            return new List<string>();
        }
    }
}
