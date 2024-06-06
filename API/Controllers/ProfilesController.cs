using Application.Profiles;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    public class ProfilesController: BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send( new Details.Query { Username = username } ));
        }

        [HttpPut]
        public async Task<IActionResult> EditProfile( EditProfile.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
