using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ThaoQuyenEditor.Api.Data;
using ThaoQuyenEditor.Api.DTOs.Request;
using ThaoQuyenEditor.Api.DTOs.Response;
using ThaoQuyenEditor.Api.Models;

namespace ThaoQuyenEditor.Api.Services;

public class ContactService : IContactService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ContactService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ContactMessageResponse>> GetAllAsync()
    {
        var messages = await _context.ContactMessages
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();

        return _mapper.Map<List<ContactMessageResponse>>(messages);
    }

    public async Task<ContactMessageResponse> CreateAsync(ContactMessageRequest request)
    {
        var message = _mapper.Map<ContactMessage>(request);
        message.Id = Guid.NewGuid();
        message.CreatedAt = DateTime.UtcNow;

        _context.ContactMessages.Add(message);
        await _context.SaveChangesAsync();

        return _mapper.Map<ContactMessageResponse>(message);
    }

    public async Task<bool> DeleteAsync(string id)
    {
        if (!Guid.TryParse(id, out var guid)) return false;

        var message = await _context.ContactMessages.FindAsync(guid);
        if (message == null) return false;

        _context.ContactMessages.Remove(message);
        await _context.SaveChangesAsync();

        return true;
    }
}
