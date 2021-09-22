using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoList.Model;

namespace TodoList.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { } 

        public DbSet<TodoListTask> TodoListTasks { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoListTask>()
                .HasOne(t => t.User)
                .WithMany(u => u.TodoListTasks)
                .HasForeignKey(t => t.UserId);
        }
        
    }
}
