using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using TodoList.Data;
using TodoList.Model;
using TodoList.GraphQL.Users;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TodoList.GraphQL.TodoListTasks
{
    public class TodoListTaskType : ObjectType<TodoListTask>
    {
        protected override void Configure(IObjectTypeDescriptor<TodoListTask> descriptor)
        {
            descriptor.Field(p => p.Id).Type<NonNullType<IdType>>();
            descriptor.Field(p => p.Title).Type<NonNullType<StringType>>();
            descriptor.Field(p => p.Description).Type<NonNullType<StringType>>();
            descriptor.Field(p => p.Completed).Type<NonNullType<BooleanType>>();

            descriptor
                .Field(p => p.User)
                .ResolveWith<Resolvers>(r => r.GetUser(default!, default!, default))
                .UseDbContext<AppDbContext>()
                .Type<NonNullType<UserType>>();

            descriptor.Field(p => p.Created).Type<NonNullType<DateTimeType>>();

        }


        private class Resolvers
        {
            public async Task<User> GetUser(TodoListTask todoListTask, [ScopedService] AppDbContext context,
                CancellationToken cancellationToken)
            {
                return await context.Users.FindAsync(new object[] { todoListTask.UserId }, cancellationToken);
            }
        }
    }
}
