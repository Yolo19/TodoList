using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using TodoList.Data;
using TodoList.Model;
using TodoList.Extensions;

namespace TodoList.GraphQL.TodoListTasks
{
    [ExtendObjectType(name: "Query")]
    public class TodoListTaskQueries
    {
        [UseAppDbContext]
        [UsePaging]
        public IQueryable<TodoListTask> GetTodoListTasks([ScopedService] AppDbContext context)
        {
            return context.TodoListTasks.OrderBy(c => c.Created);
        }

        [UseAppDbContext]
        public TodoListTask GetTodoListTask(int id, [ScopedService] AppDbContext context)
        {
            return context.TodoListTasks.Find(id);
        }
    }
}
