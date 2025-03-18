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
            LoadMenu();
        }

        private void BackToMainMenu_Click(object sender, RoutedEventArgs e) =>
            _mainWindow.GoBackToMainMenu();


        private void LoadMenu()
        {
            var data = _mainWindow.DBClient.ExecuteQuery("SELECT * FROM `menu`");
            if (data is null) return;

            var menuItems = new List<Desktop_Lib.MenuItem>();

            foreach (DataRow row in data.Rows)
            {
                menuItems.Add(new(Convert.ToInt32(row["id"]),
                    row["name"].ToString() ?? "",
                    Convert.ToInt32(row["price"]),
                    row["description"].ToString() ?? "",
                    row["image"].ToString() ?? ""));
            }

            Menu.ItemsSource = menuItems;
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

                LoadMenu();
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

            LoadMenu();
        }
    }
}
