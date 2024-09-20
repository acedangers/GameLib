using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class AppDataContext : DbContext
    {
        public AppDataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // One-to-many: Category -> Games
            modelBuilder.Entity<Game>()
                .HasOne(game => game.Category)
                .WithMany(category => category.Games)
                .HasForeignKey(game => game.CategoryId)
                .IsRequired();

            // Many-to-many: Game <-> Tag
            modelBuilder.Entity<Game>()
                .HasMany(game => game.Tags)
                .WithMany(tag => tag.Games)
                .UsingEntity(join => join.ToTable("GameTags"));
        }
    }
}
