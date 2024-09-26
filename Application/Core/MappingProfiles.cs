using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Domain.DTO;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Mapping entities.
            CreateMap<Game, Game>();
            CreateMap<Tag, Tag>();
            CreateMap<Category, Category>();

            // Mapping entities to DTOs.
            CreateMap<Game, GameDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.TagNames, opt => opt.MapFrom(src => src.Tags.Select(t => t.Name).ToList()));

            CreateMap<Tag, TagDto>()
                .ForMember(dest => dest.GameIds, opt => opt.MapFrom(src => src.Games.Select(g => g.Id).ToList()));

            CreateMap<Category, CategoryDto>()
                .ForMember(dest => dest.GameIds, opt => opt.MapFrom(src => src.Games.Select(g => g.Id).ToList()));
        }
    }
}