using Microsoft.EntityFrameworkCore;
using ThaoQuyenEditor.Api.Models;

namespace ThaoQuyenEditor.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Profile> Profiles => Set<Profile>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Post> Posts => Set<Post>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ── Profile ──────────────────────────────────────────────
        modelBuilder.Entity<Profile>(entity =>
        {
            entity.ToTable("Profiles");

            entity.Property(e => e.HeroVideoProjectId).IsRequired(false);
        });

        // ── Category ─────────────────────────────────────────────
        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("Categories");
        });

        // ── Project ──────────────────────────────────────────────
        modelBuilder.Entity<Project>(entity =>
        {
            entity.ToTable("Projects");

            entity.HasOne(e => e.Category)
                  .WithMany(c => c.Projects)
                  .HasForeignKey(e => e.CategoryId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ── Post ─────────────────────────────────────────────────
        modelBuilder.Entity<Post>(entity =>
        {
            entity.ToTable("Posts");
        });

        // ── ContactMessage ───────────────────────────────────────
        modelBuilder.Entity<ContactMessage>(entity =>
        {
            entity.ToTable("ContactMessages");
        });

        // ── AdminUser ────────────────────────────────────────────
        modelBuilder.Entity<AdminUser>(entity =>
        {
            entity.ToTable("AdminUsers");
        });
    }
}
