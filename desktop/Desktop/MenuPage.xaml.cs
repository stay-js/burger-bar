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

        private void Modify_Click(object sender, RoutedEventArgs e)
        {
            if (Menu.SelectedItems.Count == 0) return;
            if (Menu.SelectedItems.Count > 1)
            {
                MessageBox.Show("Egyszerre csak egy elemet lehet módosítani!",
                    "Figyelmezetés",
                    MessageBoxButton.OK,
                    MessageBoxImage.Warning);
                return;
            }
        }

        private void Delete_Click(object sender, RoutedEventArgs e)
        {
            if (Menu.SelectedItems.Count == 0) return;

            var result = MessageBox.Show(
                "Biztosan törölni szeretné a kijelölt eleme(ke)t?",
                "Elem(ek) törlése",
                MessageBoxButton.YesNo);

            if (result == MessageBoxResult.No) return;

            var ids = Menu.SelectedItems.Cast<Desktop_Lib.MenuItem>().Select(x => x.ID);

            _mainWindow
                .DBClient
                .ExecuteQuery($"DELETE FROM `menu` WHERE id IN({string.Join(", ", ids)})");

            LoadMenu();
        }
    }
}
