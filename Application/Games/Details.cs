using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
            private readonly IMapper mapper;

            public Handler(AppDataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<GameDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var game = await context.Games
                    .Include(g => g.Category)
                    .Include(g => g.Tags)
                    .FirstOrDefaultAsync(g => g.Id == request.Id, cancellationToken);

                if (game == null)
                    throw new Exception("Game not found");

                return mapper.Map<GameDto>(game);
            }
        }
    }
}
