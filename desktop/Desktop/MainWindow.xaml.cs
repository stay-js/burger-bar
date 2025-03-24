using Desktop_Lib;
using System.Windows;

namespace Desktop
{
    public partial class MainWindow : Window
    {
        public readonly ApiClient ApiClient = new();

        public MainWindow()
        {
            DotEnv.Load("../../../../.env");

            InitializeComponent();
            MainContent.Content = new MainMenu(this);
        }

        public void GoBackToMainMenu() => MainContent.Content = new MainMenu(this);
        public void GoToMenuPage() => MainContent.Content = new MenuPage(this);
        public void GotToReservationsPage() => MainContent.Content = new ReservationsPage(this);
    }
}
