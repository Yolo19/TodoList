using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace TodoList.Model
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        // public string Password { get; set; } = null!;

        [Required]
        public string GitHub { get; set; } = null!;

        public string ImageURI { get; set; } = null!;
        public ICollection<TodoListTask> TodoListTasks { get; set; } = new List<TodoListTask>();
    }
}
