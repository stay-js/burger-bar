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
            _ = LoadReservations();
        }

        private void BackToMainMenu_Click(object sender, RoutedEventArgs e) =>
            _mainWindow.GoBackToMainMenu();

        private async Task LoadReservations()
        {
            try
            {
                var items = await _mainWindow
                    .ApiClient
                    .GetAsync<ReservationItem[]>("/api/reservations");

                Reservations.ItemsSource = items;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }
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

                _ = LoadReservations();
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

            _ = LoadReservations();
        }
    }
}
