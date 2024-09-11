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

            var games = new List<Game>
            {
                new Game
                {
                    Name = "Call of Fruty",
                    Category = "FPS",
                    Tags = ["Action", "Multiplayer", "Shooter"],
                    Description = "Cool pew-pew game"
                },
                new Game
                {
                    Name = "Garry's Mod",
                    Category = "Sandbox",
                    Tags = ["Moddable", "Multiplayer", "Physics"],
                    Description = "Play this game with skibidi toilet"
                },
                new Game
                {
                    Name = "Bendy the Brandon",
                    Category = "Horror",
                    Tags = ["First-Person", "Singleplayer", "Puzzle"],
                    Description = "Horror desc"
                },
                new Game
                {
                    Name = "Factorio",
                    Category = "Sandbox",
                    Tags = ["Automation", "Multiplayer", "Base builing"],
                    Description = "Factorio desc"
                },
                new Game
                {
                    Name = "Risky Rain 2",
                    Category = "TPS",
                    Tags = ["Action", "Multiplayer", "Roguelike"],
                    Description = "RoR2 desc"
                },
                new Game
                {
                    Name = "Elden Souls VI: the asen city of Bloodbourne",
                    Category = "RPG",
                    Tags = ["Soulslike", "Multiplayer", "Difficult"],
                    Description = "ER desc"
                },
                new Game
                {
                    Name = "Helldivers 1",
                    Category = "Top-Down shooter",
                    Tags = ["Co-op", "Multiplayer", "Shooter"],
                    Description = "HD desc"
                },
                new Game
                {
                    Name = "Synthetic",
                    Category = "Top-Down shooter",
                    Tags = ["Co-op", "Multiplayer", "Roguelike"],
                    Description = "Synthetic desc"
                },
                new Game
                {
                    Name = "DRG",
                    Category = "FPS",
                    Tags = ["Co-op", "Multiplayer", "PVE"],
                    Description = "DRG desc"
                },
                new Game
                {
                    Name = "Vermintide",
                    Category = "FPS",
                    Tags = ["Action", "Multiplayer", "Dark Fantasy"],
                    Description = "Cool zombie game"
                },
                
            };

            await context.Games.AddRangeAsync(games);
            await context.SaveChangesAsync();
        }
    }
}