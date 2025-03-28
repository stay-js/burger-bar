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

    public record CreateReservationItem(string Name,
        string Email,
        string Phone,
        string Date,
        int People)
    { }

    public record ModifyReservationItem(int ID,
        string Name,
        string Email,
        string Phone,
        string Date,
        int People)
    { }
}
