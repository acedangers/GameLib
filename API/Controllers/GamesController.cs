using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.Games;
using Domain;
using Domain.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
	public class GamesController : BaseApiController
	{
		private readonly ILogger<GamesController> _logger;

		public GamesController(ILogger<GamesController> logger)
		{
			_logger = logger;
		}

		[HttpGet] //api/games
		public async Task<ActionResult<List<GameDto>>> GetGames()
		{
			return await Mediator.Send(new List.Query());
		}

		[HttpGet("{id}")] //api/games/{id}
		public async Task<ActionResult<GameDto>> GetGame(Guid id)
		{
			return await Mediator.Send(new Details.Query { Id = id });
		}

		[HttpPost]
		public async Task<IActionResult> CreateGame(GameDto game)
		{
			await Mediator.Send(new Create.Command { GameDto = game });
			return Ok();
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> EditGame(Guid id, GameDto game)
		{
		    game.Id = id;
		    await Mediator.Send(new Update.Command { GameDto = game });
		    return Ok();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteGame(Guid id)
		{
		    await Mediator.Send(new Delete.Command { Id = id });
		    return Ok();
		}
	}
}
