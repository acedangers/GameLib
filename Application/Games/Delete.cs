using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Games
{
	public class Delete
	{
		public class Command : IRequest
		{
			public Guid Id { get; set; }
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
				var game = await context.Games.FindAsync(request.Id);

				if (game == null)
				{
					throw new Exception("Game not found");
				}

				context.Games.Remove(game);
				await context.SaveChangesAsync(cancellationToken);
			}
		}
	}
}
