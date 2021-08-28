using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoList.GraphQL.TodoListTasks
{
    public record EditTodoListTaskInput(
        string TodoListTaskId,
        string? Title,
        string? Description,
        string? Completed);
}
