using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Search for the activity with ID from request
                var activity = await _context.Activities
                    .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                // If Activity is not found we return null
                if (activity == null) return null;

                // Find the current user
                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var hostUsername = activity.Attendees
                    .FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                // Getting attendance status for this particular user
                var attendance = activity.Attendees
                    .FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                // This means that the current user is the host, we toggle the status of cancellation
                if (attendance != null && hostUsername == user.UserName)
                    activity.IsCancelled = !activity.IsCancelled;

                // This means that the user is a normal attendee, then we remove him from attendance
                if (attendance != null && hostUsername != user.UserName)
                    activity.Attendees.Remove(attendance);

                if (attendance == null)
                {
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };

                    activity.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return 
                    result ? Result<Unit>.Success(Unit.Value) :
                    Result<Unit>.Failure("Problem updating attendance");
            }

        }
    }
}
