using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;
using TodoList.Data;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;

namespace TodoList.Extensions
{
    public class UseAppDbContextAttribute : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(
           IDescriptorContext context,
           IObjectFieldDescriptor descriptor,
           MemberInfo member)
        {
            descriptor.UseDbContext<AppDbContext>();
        }
    }
}
