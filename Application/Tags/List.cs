using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain.DTO;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tags
{
    public class List
    {
        public class Query : IRequest<List<TagDto>> { }

        public class Handler : IRequestHandler<Query, List<TagDto>>
        {
            private readonly AppDataContext context;
            private readonly IMapper mapper;

            public Handler(AppDataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<List<TagDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tags = await context.Tags
                .Include(t => t.Games)
                .ToListAsync(cancellationToken);

                return mapper.Map<List<TagDto>>(tags);
            }
        }
    }
}