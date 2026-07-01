using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ThaoQuyenEditor.Api.Data;
using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;
using ThaoQuyenEditor.Api.Models;

namespace ThaoQuyenEditor.Api.Services;

public class ProfileService : IProfileService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ProfileService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ProfileResponse> GetProfileAsync()
    {
        var profile = await _context.Profiles.FirstOrDefaultAsync();
        if (profile == null)
        {
            throw new InvalidOperationException("Profile chưa được khởi tạo.");
        }

        return _mapper.Map<ProfileResponse>(profile);
    }

    public async Task<ProfileResponse> UpdateProfileAsync(ProfileRequest request)
    {
        var profile = await _context.Profiles.FirstOrDefaultAsync()
            ?? throw new InvalidOperationException("Profile chưa được khởi tạo.");

        _mapper.Map(request, profile);
        profile.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return _mapper.Map<ProfileResponse>(profile);
    }
}
