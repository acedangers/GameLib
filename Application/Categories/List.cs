using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTO;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class List
    {
        public class Query : IRequest<List<CategoryDto>> { }

        public class Handler : IRequestHandler<Query, List<CategoryDto>>
        {
            private readonly AppDataContext context;
            private readonly IMapper mapper;

            public Handler(AppDataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<List<CategoryDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Categories
					.Include(c => c.Games)
					.ProjectTo<CategoryDto>(mapper.ConfigurationProvider)
					.ToListAsync(cancellationToken);
            }
        }
    }
}