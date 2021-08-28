
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using TodoList.Model;
using TodoList.Data;
using TodoList.Extensions;
using Octokit;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Collections.Generic;
using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Authorization;
using User = TodoList.Model.User;

namespace TodoList.GraphQL.Users
{
    [ExtendObjectType(name: "Mutation")]
    public class UserMutations
    {
        //[UseAppDbContext]
        ////[Authorize]
        //public async Task<User> AddUserAsync(AddUserInput input,
        //[ScopedService] AppDbContext context, CancellationToken cancellationToken)
        //{
        //    //var userIdStr = claimsPrincipal.Claims.First(c => c.Type == "userId").Value;
        //    var user = new User
        //    {
        //        Name = input.Name,
        //        Password = input.Password,
        //    };

        //    context.Users.Add(user);
        //    await context.SaveChangesAsync(cancellationToken);

        //    return user;
        //}

        [UseAppDbContext]
        [Authorize]
        public async Task<User> EditUserAsync(EditUserInput input, ClaimsPrincipal claimsPrincipal,
                [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var userIdStr = claimsPrincipal.Claims.First(c => c.Type == "userId").Value;
            var user = await context.Users.FindAsync(int.Parse(userIdStr));

            user.Name = input.Name ?? user.Name;
            user.Password = input.Password ?? user.Password;

            await context.SaveChangesAsync(cancellationToken);

            return user;
        }

        [UseAppDbContext]
        public async Task<LoginPayload> LoginAsync(LoginInput input, [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var client = new GitHubClient(new ProductHeaderValue("TodoList"));

            var request = new OauthTokenRequest(Startup.Configuration["Github:ClientId"], Startup.Configuration["Github:ClientSecret"], input.Code);

            var tokenInfo = await client.Oauth.CreateAccessToken(request);

            if (tokenInfo.AccessToken == null)
            {
                throw new GraphQLRequestException(ErrorBuilder.New()
                    .SetMessage("Bad code")
                    .SetCode("AUTH_NOT_AUTHENTICATED")
                    .Build());
            }

            client.Credentials = new Credentials(tokenInfo.AccessToken);
            var usernew = await client.User.Current();

           var user = await context.Users.FirstOrDefaultAsync(s => s.Password == usernew.Login, cancellationToken);

            if (user == null)
            {
                user = new User
                {
                    Name = usernew.Name ?? usernew.Login,
                    Password = usernew.Login,
                };

                context.Users.Add(user);
                await context.SaveChangesAsync(cancellationToken);
            }

            // authentication successful so generate jwt token
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Startup.Configuration["JWT:Secret"]));
            var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>{
                new Claim("userId", user.Id.ToString()),
            };

            var jwtToken = new JwtSecurityToken(
                "TodoList",
                "User",
                claims,
                expires: DateTime.Now.AddDays(90),
                signingCredentials: credentials);

            string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            return new LoginPayload(user, token);
        }
    }
}
