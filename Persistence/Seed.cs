using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(AppDataContext context)
        {
            if (context.Games.Any()) return;

            // Seed Categories
            var categories = new List<Category>
            {
                new Category { Id = Guid.NewGuid(), Name = "FPS", },
                new Category { Id = Guid.NewGuid(), Name = "Sandbox", },
                new Category { Id = Guid.NewGuid(), Name = "Horror", },
                new Category { Id = Guid.NewGuid(), Name = "TPS", },
                new Category { Id = Guid.NewGuid(), Name = "RPG", },
                new Category { Id = Guid.NewGuid(), Name = "Top-Down Shooter", },
            };

            // Seed Tags
            var tags = new List<Tag>
            {
                new Tag { Id = Guid.NewGuid(), Name = "Action", },
                new Tag { Id = Guid.NewGuid(), Name = "Multiplayer", },
                new Tag { Id = Guid.NewGuid(), Name = "Shooter", },
                new Tag { Id = Guid.NewGuid(), Name = "Physics", },
                new Tag { Id = Guid.NewGuid(), Name = "Moddable", },
                new Tag { Id = Guid.NewGuid(), Name = "Puzzle", },
                new Tag { Id = Guid.NewGuid(), Name = "First-Person", },
                new Tag { Id = Guid.NewGuid(), Name = "Singleplayer", },
                new Tag { Id = Guid.NewGuid(), Name = "Automation", },
                new Tag { Id = Guid.NewGuid(), Name = "Base builing", },
                new Tag { Id = Guid.NewGuid(), Name = "Roguelike", },
                new Tag { Id = Guid.NewGuid(), Name = "Soulslike", },
                new Tag { Id = Guid.NewGuid(), Name = "Difficult", },
                new Tag { Id = Guid.NewGuid(), Name = "Co-op", },
                new Tag { Id = Guid.NewGuid(), Name = "PVE", },
                new Tag { Id = Guid.NewGuid(), Name = "Dark Fantasy", },
            };

            // Seed Games
            var games = new List<Game>
            {
                new Game
                {
                    Id = Guid.NewGuid(),
                    Name = "Call of Fruty",
                    Category = categories[0],
                    Description = "Cool pew-pew game"
                },
                new Game
                {
                    Id = Guid.NewGuid(),
                    Name = "Garry's Mod",
                    Category = categories[1],
                    Description = "Play this game with skibidi toilet"
                },
                new Game
                {
                    Id = Guid.NewGuid(),
                    Name = "Bendy the Brandon",
                    Category = categories[2],
                    Description = "Horror desc"
                },
                new Game
                {
                    Id = Guid.NewGuid(),
                    Name = "Factorio",
                    Category = categories[1],
                    Description = "Factorio desc"
                },
                new Game
                {
                    Id = Guid.NewGuid(),
                    Name = "Risky Rain 2",
                    Category = categories[3],
                    Description = "RoR2 desc"
                },
                new Game
                {
                    Id = Guid.NewGuid(),
                    Name = "Elden Souls VI: the ashen city of Bloodborne",
                    Category = categories[4],
                    Description = "ER desc"
                },
                new Game
                {
                    Id = Guid.NewGuid(),
                    Name = "Helldivers 1",
                    Category = categories[5],
                    Description = "HD desc"
                },
                new Game
                {
                    Id = Guid.NewGuid(),
                    Name = "Synthetic",
                    Category = categories[5],
                    Description = "Synthetic desc"
                },
                new Game
                {
                    Id = Guid.NewGuid(),
                    Name = "DRG",
                    Category = categories[0],
                    Description = "DRG desc"
                },
                new Game
                {
                    Id = Guid.NewGuid(),
                    Name = "Vermintide",
                    Category = categories[0],
                    Description = "Cool zombie game"
                },
            };

            // Seed the many-to-many relationship: Game <-> Tag
            games[0].Tags.AddRange([tags[0], tags[1], tags[2]]);
            games[1].Tags.AddRange([tags[4], tags[1], tags[3]]);
            games[2].Tags.AddRange([tags[6], tags[7], tags[5]]);
            games[3].Tags.AddRange([tags[8], tags[1], tags[9]]);
            games[4].Tags.AddRange([tags[0], tags[1], tags[10]]);
            games[5].Tags.AddRange([tags[11], tags[1], tags[12]]);
            games[6].Tags.AddRange([tags[13], tags[1], tags[2]]);
            games[7].Tags.AddRange([tags[13], tags[1], tags[10]]);
            games[8].Tags.AddRange([tags[13], tags[1], tags[14]]);
            games[9].Tags.AddRange([tags[0], tags[1], tags[15]]);

            await context.Categories.AddRangeAsync(categories);
            await context.Tags.AddRangeAsync(tags);
            await context.Games.AddRangeAsync(games);
            await context.SaveChangesAsync();
        }
    }
}