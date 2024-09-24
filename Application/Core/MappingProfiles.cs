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
            CreateMap<Tag, TagDto>()
            .ForMember(dest => dest.GameIds, opt => opt.MapFrom(src => src.Games.Select(g => g.Id).ToList()));

            CreateMap<Category, CategoryDto>()
            .ForMember(dest => dest.GameIds, opt => opt.MapFrom(src => src.Games.Select(g => g.Id).ToList()));
        }
    }
}