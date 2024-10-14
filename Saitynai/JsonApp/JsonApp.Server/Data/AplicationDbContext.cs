// Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using JsonApp.Server.Models;

namespace JsonApp.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Theme> Themes { get; set; }
        public DbSet<ObjectFile> ObjectFiles { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<PopularityVote> PopularityVotes { get; set; }

        
        
    }
}
