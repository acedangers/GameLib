using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.DTO;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Games
{
    public class List
    {
        public class Query : IRequest<List<GameDto>> { }

        public class Handler : IRequestHandler<Query, List<GameDto>>
        {
            private readonly AppDataContext context;

            public Handler(AppDataContext context)
            {
                this.context = context;
            }

            public async Task<List<GameDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Games
                .Include(g => g.Category)
                .Include(g => g.Tags)
                .Select(g => new GameDto
                {
                    Id = g.Id,
                    Name = g.Name,
                    Description = g.Description,
                    Category = g.Category.Name,
                    Tags = g.Tags.Select(t => t.Name).ToList(),
                })
                .ToListAsync(cancellationToken);
            }
        }
    }
}
