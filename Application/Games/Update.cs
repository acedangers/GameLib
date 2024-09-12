using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Games
{
    public class Update
    {
        public class Command : IRequest
        {
            public Game Game { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly AppDataContext context;
            private readonly IMapper mapper;

            public Handler(AppDataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var game = await context.Games.FindAsync(request.Game.Id);
                mapper.Map(request.Game, game);
                await context.SaveChangesAsync();
            }
        }
    }
}
