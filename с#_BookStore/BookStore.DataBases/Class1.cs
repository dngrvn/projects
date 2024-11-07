using Microsoft.EntityFrameworkCore;

namespace BookStore.DataBases;
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
