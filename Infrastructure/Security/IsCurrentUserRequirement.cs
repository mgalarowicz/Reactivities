using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class IsCurrentUserRequirement : IAuthorizationRequirement
    {

    }

    public class IsCurrentUserRequirementHandler : AuthorizationHandler<IsCurrentUserRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsCurrentUserRequirementHandler (IHttpContextAccessor httpContextAccessor, 
            DataContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        protected override Task HandleRequirementAsync (AuthorizationHandlerContext context, 
            IsCurrentUserRequirement requirement)
        {
            var currentUserName = _httpContextAccessor.HttpContext
                .User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var userName = _httpContextAccessor.HttpContext.
                Request.RouteValues.SingleOrDefault(x => x.Key == "username").Value.ToString();

            if (userName == currentUserName)
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}