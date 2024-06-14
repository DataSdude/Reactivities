using Application.Activities;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Profiles
{
    public class ListProfileActivities
    {

        public class Query : IRequest<Result<List<ProfileActivityDto>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }

            public class Handler : IRequestHandler<Query, Result<List<ProfileActivityDto>>>
            {
                private readonly DataContext _context;
                private readonly IMapper _mapper;

                public Handler(DataContext context, IMapper mapper)
                {
                    _context = context;
                    _mapper = mapper;
                }

                public async Task<Result<List<ProfileActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
                {

                    var query = _context.Activities
                        .Where(a => a.Attendees.Any(x => x.AppUser.UserName == request.Username))
                        .OrderBy(d => d.Date)
                       .ProjectTo<ProfileActivityDto>(_mapper.ConfigurationProvider);

                    query = request.Predicate switch
                    {
                        "future" => query.Where(x => x.Date >= DateTime.Now),
                        "past" => query.Where(x => x.Date <= DateTime.Now),
                        "hosting" => query.Where(a => a.HostUsername == request.Username),
                        _ => throw new Exception("Path is not supported"),
                    };
                    var activities = await query.ToListAsync();
                    return Result<List<ProfileActivityDto>>.Success(activities);


                    //var query = _context.ActivityAttendees
                    //           .Where(x => x.AppUser.UserName == request.Username)
                    //           .OrderBy(d => d.Activity.Date)
                    //           .ProjectTo<ProfileActivityDto>(_mapper.ConfigurationProvider)
                    //           .AsQueryable();

                    //query = request.Predicate switch
                    //{
                    //    "future" => query.Where(x => x.Date >= DateTime.Now),
                    //    "past" => query.Where(x => x.Date <= DateTime.Now),
                    //    "hosting" => query.Where(a => a.HostUsername == request.Username),
                    //    _ => throw new Exception("Path is not supported"),
                    //};

                    //var activities = await query.ToListAsync();
                    //return Result<List<ProfileActivityDto>>.Success(activities);

                }
            }

        }
    }
}
