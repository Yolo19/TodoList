using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using TodoList.Model;
using TodoList.Data;
using HotChocolate.Types;
using TodoList.Extensions;
using System.Security.Claims;
using HotChocolate.AspNetCore.Authorization;

namespace TodoList.GraphQL.Users
{
    [ExtendObjectType(name: "Query")]
    public class UserQueries
    {
        [UseAppDbContext]
        [UsePaging]
        public IQueryable<User> GetUsers([ScopedService] AppDbContext context)
        {
            return context.Users;
        }
        [UseAppDbContext]
        public User GetUser(int id, [ScopedService] AppDbContext context)
        {
            return context.Users.Find(id);
        }

        [UseAppDbContext]
        [Authorize]
        public User GetSelf(ClaimsPrincipal claimsPrincipal, [ScopedService] AppDbContext context)
        {
            var userIdStr = claimsPrincipal.Claims.First(c => c.Type == "userId").Value;

            return context.Users.Find(int.Parse(userIdStr));
        }
    }
}
