using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace TodoList.Model
{
    public class TodoListTask
    {
        [Key]
        public string Id { get; set; } = null!;

        [Required]
        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        [Required]
        public bool Completed { get; set; } = false!;

        [Required]
        public int UserId { get; set; }

        public User User { get; set; } = null!;

        public DateTime Created { get; set; }
    }
}
