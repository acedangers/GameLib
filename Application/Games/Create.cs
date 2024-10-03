using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Domain.DTO;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Games
{
	public class Create
	{
		public class Command : IRequest
		{
			public GameDto GameDto { get; set; }
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
				// Map the GameDto to Game entity, excluding navigation properties like Category and Tags
				var game = mapper.Map<Game>(request.GameDto);

				// Fetch and assign the Category based on the CategoryName
				var category = await context.Categories
					.FirstOrDefaultAsync(c => c.Name == request.GameDto.CategoryName, cancellationToken);

				if (category == null)
				{
					throw new Exception("Category not found");
				}

				game.Category = category;

				// Fetch and assign the Tags based on TagNames
				var tags = await context.Tags
					.Where(t => request.GameDto.TagNames.Contains(t.Name))
					.ToListAsync(cancellationToken);

				if (!tags.Any())
				{
					throw new Exception("Tags not found");
				}

				game.Tags.AddRange(tags);
				
				// Add game to database and save changes
				context.Games.Add(game);
				await context.SaveChangesAsync(cancellationToken);
			}
		}
	}
}
