using Desktop_Lib;
using System.Data;
using System.Windows;
using System.Windows.Controls;


namespace Desktop
{
    public partial class ReservationsPage : UserControl
    {
        private readonly MainWindow _mainWindow;

        public ReservationsPage(MainWindow mainWindow)
        {
            InitializeComponent();
            _mainWindow = mainWindow;
            LoadReservations();
        }

        private void BackToMainMenu_Click(object sender, RoutedEventArgs e) =>
            _mainWindow.GoBackToMainMenu();

        private void LoadReservations()
        {
            var data = _mainWindow.DBClient.ExecuteQuery("SELECT * FROM `table-reservation`");
            if (data is null) return;

            var reservations = new List<ReservationItem>();

            foreach (DataRow row in data.Rows)
            {
                reservations.Add(new(
                    Convert.ToInt32(row["id"]),
                    row["name"].ToString() ?? "",
                    row["email"].ToString() ?? "",
                    row["phone"].ToString() ?? "",
                    Convert.ToDateTime(row["date"]),
                    row["time"].ToString() ?? "",
                    Convert.ToInt32(row["people"]),
                    row["message"].ToString() ?? ""));
            }

            Reservations.ItemsSource = reservations;
        }
    }
}
