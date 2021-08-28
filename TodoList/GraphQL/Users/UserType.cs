using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HotChocolate;
using HotChocolate.Types;
using TodoList.Data;
using TodoList.Model;
using System.Threading;
using TodoList.GraphQL.TodoListTasks;


namespace TodoList.GraphQL.Users
{
    public class UserType : ObjectType<User>
    {
        protected override void Configure(IObjectTypeDescriptor<User> descriptor)
        {
            descriptor.Field(s => s.Id).Type<NonNullType<IdType>>();
            descriptor.Field(s => s.Name).Type<NonNullType<StringType>>();
            descriptor.Field(s => s.Password).Type<NonNullType<StringType>>();

            descriptor
                .Field(s => s.TodoListTasks)
                .ResolveWith<Resolvers>(r => r.GetTodoListTasks(default!, default!, default))
                .UseDbContext<AppDbContext>()
                .Type<NonNullType<ListType<NonNullType<TodoListTaskType>>>>();
        }
        private class Resolvers
        {
            public async Task<IEnumerable<TodoListTask>> GetTodoListTasks(User user, [ScopedService] AppDbContext context,
                CancellationToken cancellationToken)
            {
                return await context.TodoListTasks.Where(c => c.UserId == user.Id).ToArrayAsync(cancellationToken);
            }
        }
    }
}
