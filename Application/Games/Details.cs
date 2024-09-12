using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Games
{
    public class Details
    {
        public class Query : IRequest<Game>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Game>
        {
            private readonly AppDataContext context;

            public Handler(AppDataContext context)
            {
                this.context = context;
            }

            public async Task<Game> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Games.FindAsync(request.Id);
            }
        }
    }
}
