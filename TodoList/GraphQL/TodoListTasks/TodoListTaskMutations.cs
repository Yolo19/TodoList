using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Authorization;
using TodoList.Model;
using TodoList.Data;
using TodoList.Extensions;
using System.Security.Claims;
using System.Linq;

namespace TodoList.GraphQL.TodoListTasks
{
    [ExtendObjectType(name: "Mutation")]
    public class TodoListTaskMutations
    {
        [UseAppDbContext]
        [Authorize]
        public async Task<TodoListTask> AddTodoListTaskAsync(AddTodoListTaskInput input, ClaimsPrincipal claimsPrincipal,
            [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var userIdStr = claimsPrincipal.Claims.First(c => c.Type == "userId").Value;
            var todoListTask = new TodoListTask
            {
                Title = input.Title,
                Description = input.Description,
                Completed = input.Completed,
                UserId = int.Parse(userIdStr),
                Created = DateTime.Now,
            };
            context.TodoListTasks.Add(todoListTask);

            await context.SaveChangesAsync(cancellationToken);

            return todoListTask;
        }

        [UseAppDbContext]
        [Authorize]
        public async Task<TodoListTask> EditTodoListTaskAsync(EditTodoListTaskInput input, ClaimsPrincipal claimsPrincipal,
            [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var userIdStr = claimsPrincipal.Claims.First(c => c.Type == "userId").Value;
            var todoListTask = await context.TodoListTasks.FindAsync(int.Parse(input.TodoListTaskId));

            if (todoListTask.UserId != int.Parse(userIdStr))
            {
                throw new GraphQLRequestException(ErrorBuilder.New()
                    .SetMessage("Not owned by user")
                    .SetCode("AUTH_NOT_AUTHORIZED")
                    .Build());
            }

            todoListTask.Title = input.Title ?? todoListTask.Title;
            todoListTask.Description = input.Description ?? todoListTask.Description;
            todoListTask.Completed = !todoListTask.Completed;


            await context.SaveChangesAsync(cancellationToken);

            return todoListTask;
        }
    }
}
