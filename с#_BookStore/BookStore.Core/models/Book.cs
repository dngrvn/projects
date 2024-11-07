namespace BookStore.Core.Models;
{
    public class Book //создаем поля
{   
    // Создаем константу для валидации
    public const int MAX_TITLE_LENGTH = 250;

    private Book(Guid id, string title, string description, decimal price)
    {
        //Создаем конструктор(свойства)
        Id = id;
        Title = title;
        Description = description;
        Price = price;
    }


    // SET убираем так как это доменная модель, мы не должны из вне взаимодествовать с этой моделью
    public Guid Id { get; }

    public string Title { get; } = string.Empty; 

    public string Description { get; } = string.Empty;

    public decimal Price { get; }


    //Валидация (возвращаем кортеж)
    public static (Book Book, string Error) Create (Guid id, string title, string description, decimal price)
    {
        //Создаем ошибку если не пройдет валидания
        var error = string.Empty;
        
        //Проверяем заголовок на длинну
        if (string.IsNullOrEmpty(title) || title.Length > MAX_TITLE_LENGTH)
        {
            error =" Title can not be empty or longer than 250 characters ";
        }
        
        // Создаем объект
        var book = new book(id, title, description, price);
        
        //Возвращаем кортеж
        return (book, error);
    }
}
}

