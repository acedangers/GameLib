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
	public class Update
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
				// Use AutoMapper to update the game properties, excluding navigation properties
				mapper.Map<Game>(request.GameDto);

				// Fetch the existing game to update
				var game = await context.Games
					.Include(g => g.Category)
					.Include(g => g.Tags)
					.FirstOrDefaultAsync(g => g.Id == request.GameDto.Id, cancellationToken);

				if (game == null)
				{
					throw new Exception("Game not found");
				}

				// Update the Category
				var category = await context.Categories
					.FirstOrDefaultAsync(c => c.Name == request.GameDto.CategoryName, cancellationToken);

				if (category == null)
				{
					throw new Exception("Category not found");
				}

				game.Category = category;

				// Update the Tags
				var tags = await context.Tags
					.Where(t => request.GameDto.TagNames.Contains(t.Name))
					.ToListAsync(cancellationToken);

				if (!tags.Any())
				{
					throw new Exception("Tags not found");
				}

				// Manage the Tags
				var newTagNames = request.GameDto.TagNames;

				// Get current tags
				var currentTags = game.Tags.ToList();

				// Identify tags to remove (that are not in the new list)
				var tagsToRemove = currentTags
					.Where(t => !newTagNames.Contains(t.Name))
					.ToList();

				// Remove tags that are not in the new list
				if (tagsToRemove.Any())
				{
					context.Tags.RemoveRange(tagsToRemove);
				}

				// Identify tags to add (that are not already associated)
				var tagsToAdd = new List<Tag>();
				foreach (var tagName in newTagNames)
				{
					if (!currentTags.Any(t => t.Name == tagName))
					{
						var tag = await context.Tags.FirstOrDefaultAsync(t => t.Name == tagName, cancellationToken);
						if (tag != null)
						{
							tagsToAdd.Add(tag);
						}
						else
						{
							throw new Exception($"Tag '{tagName}' not found");
						}
					}
				}

				// Add new tags to the game
				if (tagsToAdd.Any())
				{
					game.Tags.AddRange(tagsToAdd);
				}

				// Save changes to the database
				await context.SaveChangesAsync(cancellationToken);
			}
		}
	}
}
