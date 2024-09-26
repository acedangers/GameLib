using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain.DTO;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class Details
    {
        public class Query : IRequest<CategoryDto>
        {
            public string Name { get; set; }
        }

        public class Handler : IRequestHandler<Query, CategoryDto>
        {
            private readonly AppDataContext context;
            private readonly IMapper mapper;

            public Handler(AppDataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<CategoryDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var category = await context.Categories
                    .Include(c => c.Games)
                    .FirstOrDefaultAsync(c => c.Name == request.Name, cancellationToken);

                if (category == null)
                    throw new Exception("Category not found");

                return mapper.Map<CategoryDto>(category);
            }
        }
    }
}