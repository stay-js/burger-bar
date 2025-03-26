namespace Desktop_Lib
{
    public record MenuItem(int ID,
        string Name,
        int Price,
        string Description,
        string Image)
    {
        public override string ToString()
        {
            return $"{Name} ({Price:C0})";
        }
    }

    public record CreateMenuItem(string Name,
    int Price,
    string Description,
    string Image)
    { }
}
