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
	public class List
	{
		public class Query : IRequest<List<GameDto>> { }

		public class Handler : IRequestHandler<Query, List<GameDto>>
		{
			private readonly AppDataContext context;
			private readonly IMapper mapper;

			public Handler(AppDataContext context, IMapper mapper)
			{
				this.context = context;
				this.mapper = mapper;
			}

			public async Task<List<GameDto>> Handle(Query request, CancellationToken cancellationToken)
			{
				return await context.Games
					.Include(g => g.Category)
					.Include(g => g.Tags)
					.ProjectTo<GameDto>(mapper.ConfigurationProvider)
					.ToListAsync(cancellationToken);
			}
		}
	}
}
