using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Games
{
    public class List
    {
        public class Query : IRequest<List<Game>> { }
        public class Handler : IRequestHandler<Query, List<Game>>
        {
            private readonly AppDataContext context;
            public Handler(AppDataContext context)
            {
                this.context = context;
            }
            public async Task<List<Game>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Games.ToListAsync();
            }
        }
    }
}