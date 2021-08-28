using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Model;

namespace TodoList.GraphQL.Users
{
    public record LoginPayload(
        User user,
        string jwt);
}
