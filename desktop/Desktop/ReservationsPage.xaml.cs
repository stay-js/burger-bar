using Desktop_Lib;
using System.Data;
using System.Net.Http;
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

        private async void ModifyButton_Click(object sender, RoutedEventArgs e)
        {
            if (Reservations.SelectedItems.Count == 0) return;
            if (Reservations.SelectedItems.Count > 1)
            {
                MessageBoxHelper.ModifyMoreThanOneWarning();
                return;
            }

            var selectedItem = (Reservations.SelectedItem as ReservationItem)!;

            var modifyDialog = new ModifyReservationDialog(selectedItem);

            if (modifyDialog.ShowDialog() == true)
            {
                var item = new ModifyReservationItem(selectedItem.ID,
                    $"{modifyDialog.Date.SelectedDate:yyyy.MM.dd} {modifyDialog.Time.Text}",
                    int.Parse(modifyDialog.People.Text));

                try
                {
                    await _mainWindow
                        .ApiClient
                        .PostPutOrPatchAsync("/api/reservations", HttpMethod.Patch, item);
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error: {ex.Message}");
                }

                await LoadReservations();
            }
        }

        private async void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (Reservations.SelectedItems.Count == 0) return;

            var result = MessageBoxHelper.DeleteConfirmation();
            if (result == MessageBoxResult.No) return;

            var ids = Reservations.SelectedItems.Cast<ReservationItem>().Select(x => x.ID);

            try
            {
                await _mainWindow.ApiClient.DeleteAsync("/api/reservations", ids);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }

            await LoadReservations();
        }
    }
}
