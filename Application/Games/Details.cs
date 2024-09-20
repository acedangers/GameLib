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
    public class Details
    {
        public class Query : IRequest<GameDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, GameDto>
        {
            private readonly AppDataContext context;

            public Handler(AppDataContext context)
            {
                this.context = context;
            }

            public async Task<GameDto> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Games
                .Where(g => g.Id == request.Id)
                .Include(g => g.Category)
                .Include(g => g.Tags)
                .Select(g => new GameDto
                {
                    Id = g.Id,
                    Name =  g.Name,
                    Description = g.Description,
                    Category = g.Category.Name,
                    Tags = g.Tags.Select(t => t.Name).ToList(),
                }).FirstOrDefaultAsync(cancellationToken);
            }
        }
    }
}
