using BookStore.DataAccess.Entites;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess;
{

public class BookStoreDBContext : DbContext
{
    public BookStoreDBContext(DbContextOptions<BookStoreDBContext> options) 
    : base(options) 
    {

    }

    public DbSet<BookEntity> Books { get; set; }
}
}
