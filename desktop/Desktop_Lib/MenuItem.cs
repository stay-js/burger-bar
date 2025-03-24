namespace Desktop_Lib
{
    public record MenuItem(int ID,
        string Name,
        int Price,
        string Description,
        string Image)
    { }

    public record CreateMenuItem(string Name,
    int Price,
    string Description,
    string Image)
    { }
}
