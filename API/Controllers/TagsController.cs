using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.Tags;
using Domain.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class TagsController : BaseApiController
    {
        private readonly ILogger<TagsController> _logger;

        public TagsController(ILogger<TagsController> logger)
        {
            _logger = logger;
        }

        [HttpGet] //api/tags
        public async Task<ActionResult<List<TagDto>>> GetTags()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //api/tags/{id}
        public async Task<ActionResult<TagDto>> GetTag(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
    }
}