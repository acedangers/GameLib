using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Games
{
    public class Create
    {
        public class Command : IRequest
        {
            public Game Game { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly AppDataContext context;

            public Handler(AppDataContext context)
            {
                this.context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await context.Games.AddAsync(request.Game);

                await context.SaveChangesAsync();
            }
        }
    }
}
