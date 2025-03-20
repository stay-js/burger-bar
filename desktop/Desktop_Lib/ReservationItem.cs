namespace Desktop_Lib
{
    public record ReservationItem(int ID,
        string Name,
        string Email,
        string Phone,
        DateTime Date,
        int People,
        string Message)
    { }
}
