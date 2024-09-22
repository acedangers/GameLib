using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.DTO
{
    public class NewGameDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CategoryId { get; set; }
        public List<Guid> TagIds { get; set; } = new List<Guid>();
        public string Description { get; set; }
    }
}