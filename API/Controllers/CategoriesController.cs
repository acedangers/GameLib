using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Categories;
using Domain.DTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {
        private readonly ILogger<CategoriesController> _logger;

        public CategoriesController(ILogger<CategoriesController> logger)
        {
            _logger = logger;
        }

        [HttpGet] //api/categories
        public async Task<ActionResult<List<CategoryDto>>> GetCategories()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{name}")] //api/categories/{name}
        public async Task<ActionResult<CategoryDto>> GetCategory(string name)
        {
            return await Mediator.Send(new Details.Query { Name = name });
        }
    }
}