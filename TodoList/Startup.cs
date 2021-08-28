using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Data;
using TodoList.GraphQL.Users;
using TodoList.GraphQL.TodoListTasks;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace TodoList
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {      
            services.AddPooledDbContextFactory<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters =
                        new TokenValidationParameters
                        {
                            ValidIssuer = "TodoList",
                            ValidAudience = "User",
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = signingKey
                        };
                });
            services.AddAuthorization();

            services
                .AddGraphQLServer()
                .AddAuthorization()
                .AddQueryType(q => q.Name("Query"))
                    .AddTypeExtension<UserQueries>()
                    .AddTypeExtension<TodoListTaskQueries>()
                .AddMutationType(d => d.Name("Mutation"))
                    .AddTypeExtension<UserMutations>()
                    .AddTypeExtension<TodoListTaskMutations>()
                .AddType<TodoListTaskType>()
                .AddType<UserType>();
            services.AddCors(c => c.AddPolicy("MyCors", a =>
                  a.AllowAnyHeader().
                      AllowAnyMethod().
                      AllowAnyOrigin()));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("MyCors");
            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGraphQL();
            });
        }
    }
}
