using BookStore.DataBases.Entites;
using Microsoft.EntityFrameworkCore;


namespace BookStore.DataBases.Cofiguration
{
    internal class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Cofiguration(EntityTypeBuilder<Book> builder)
        {
            throw new NotImplementedException();
        }
    }
}
// https://www.youtube.com/watch?v=X2-5mxFPvUM