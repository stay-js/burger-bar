using System.Data;
using System.Windows;
using System.Windows.Controls;


namespace Desktop
{
    public partial class MenuPage : UserControl
    {
        private readonly MainWindow _mainWindow;

        public MenuPage(MainWindow mainWindow)
        {
            InitializeComponent();
            _mainWindow = mainWindow;
            _ = LoadMenu();
        }

        private void BackToMainMenu_Click(object sender, RoutedEventArgs e) =>
            _mainWindow.GoBackToMainMenu();

        private async Task LoadMenu()
        {
            try
            {
                var items = await _mainWindow
                    .ApiClient
                    .GetAsync<Desktop_Lib.MenuItem[]>("/api/menu");

                Menu.ItemsSource = items;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }
        }

        private void CreateButton_Click(object sender, RoutedEventArgs e)
        {
            var createDialog = new ModifyMenuItemDialog(null);

            if (createDialog.ShowDialog() == true)
            {
                _mainWindow
                    .DBClient
                    .ExecuteQuery($"INSERT INTO `menu` (name, price, description, image) " +
                    $"VALUES ('{createDialog.ItemName.Text}', {createDialog.Price.Text}, " +
                    $"'{createDialog.Description.Text}', '{createDialog.Image.Text}')");

                _ = LoadMenu();
            }
        }

        private void ModifyButton_Click(object sender, RoutedEventArgs e)
        {
            if (Menu.SelectedItems.Count == 0) return;
            if (Menu.SelectedItems.Count > 1)
            {
                MessageBoxHelper.ModifyMoreThanOneWarning();
                return;
            }

            var item = (Menu.SelectedItem as Desktop_Lib.MenuItem)!;

            var modifyDialog = new ModifyMenuItemDialog(item);

            if (modifyDialog.ShowDialog() == true)
            {
                _mainWindow
                    .DBClient
                    .ExecuteQuery($"UPDATE `menu` " +
                    $"SET name = '{modifyDialog.ItemName.Text}', " +
                    $"price = {modifyDialog.Price.Text}, " +
                    $"description = '{modifyDialog.Description.Text}', " +
                    $"image = '{modifyDialog.Image.Text}' " +
                    $"WHERE id = {item.ID}");

                _ = LoadMenu();
            }
        }
        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (Menu.SelectedItems.Count == 0) return;

            var result = MessageBoxHelper.DeleteConfirmation();
            if (result == MessageBoxResult.No) return;

            var ids = Menu.SelectedItems.Cast<Desktop_Lib.MenuItem>().Select(x => x.ID);

            _mainWindow
                .DBClient
                .ExecuteQuery($"DELETE FROM `menu` WHERE id IN({string.Join(", ", ids)})");

            _ = LoadMenu();
        }
    }
}
