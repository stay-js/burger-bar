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
                    Convert.ToInt32(row["people"]),
                    row["message"].ToString() ?? ""));
            }

            Reservations.ItemsSource = reservations;
        }

        private void ModifyButton_Click(object sender, RoutedEventArgs e)
        {
            if (Reservations.SelectedItems.Count == 0) return;
            if (Reservations.SelectedItems.Count > 1)
            {
                MessageBoxHelper.ModifyMoreThanOneWarning();
                return;
            }

            var item = (Reservations.SelectedItem as ReservationItem)!;

            var modifyDialog = new ModifyReservationDialog(item);

            if (modifyDialog.ShowDialog() == true)
            {
                _mainWindow
                    .DBClient
                    .ExecuteQuery($"UPDATE `table-reservation` SET " +
                    $"date = '{modifyDialog.Date.SelectedDate:yyyy.MM.dd} {modifyDialog.Time.Text}', " +
                    $"people = {modifyDialog.People.Text} " +
                    $"WHERE id = {item.ID}");

                LoadReservations();
            }
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (Reservations.SelectedItems.Count == 0) return;

            var result = MessageBoxHelper.DeleteConfirmation();
            if (result == MessageBoxResult.No) return;

            var ids = Reservations.SelectedItems.Cast<ReservationItem>().Select(x => x.ID);

            _mainWindow
                .DBClient
                .ExecuteQuery($"DELETE FROM `table-reservation` WHERE id IN({string.Join(", ", ids)})");

            LoadReservations();
        }
    }
}
