using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoList.GraphQL.TodoListTasks
{
    public record AddTodoListTaskInput(
        string Title,
        string Description,
        bool Completed);
}
