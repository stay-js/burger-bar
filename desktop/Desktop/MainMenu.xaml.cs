using System.Windows;
using System.Windows.Controls;

namespace Desktop
{
    public partial class MainMenu : UserControl
    {
        private readonly MainWindow _mainWindow;

        public MainMenu(MainWindow mainWindow)
        {
            InitializeComponent();
            _mainWindow = mainWindow;
        }

        private void Menu_Click(object sender, RoutedEventArgs e) =>
            _mainWindow.GoToMenuPage();

        private void Reservations_Click(object sender, RoutedEventArgs e) =>
            _mainWindow.GotToReservationsPage();

        private void Order_Click(object sender, RoutedEventArgs e) =>
            _mainWindow.GotToOrderPage();
    }
}
