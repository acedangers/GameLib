using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Game
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        public List<Tag> Tags { get; } = new List<Tag>();
        public string Description { get; set; }
    }
}