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
    public class Details
    {
        public class Query : IRequest<TagDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, TagDto>
        {
            private readonly AppDataContext context;
            private readonly IMapper mapper;

            public Handler(AppDataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<TagDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var tag = await context.Tags
                    .Include(t => t.Games)
                    .FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);

                if (tag == null)
                    throw new Exception("Tag not found");

                return mapper.Map<TagDto>(tag);
            }
        }
    }
}