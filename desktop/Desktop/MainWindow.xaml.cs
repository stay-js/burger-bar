using Desktop_Lib;
using System.Windows;

namespace Desktop
{
    public partial class MainWindow : Window
    {
        public readonly DBClient DBClient;

        public MainWindow()
        {
            DotEnv.Load("../../../../.env");
            DBClient = new(Environment.GetEnvironmentVariable("MYSQL_URL") ?? "",
                    Environment.GetEnvironmentVariable("MYSQL_DATABASE") ?? "",
                    Environment.GetEnvironmentVariable("MYSQL_USER") ?? "",
                    Environment.GetEnvironmentVariable("MYSQL_PASSWORD") ?? "");

            InitializeComponent();
            MainContent.Content = new MainMenu(this);
        }

        public void GoBackToMainMenu() => MainContent.Content = new MainMenu(this);
        public void GoToMenuPage() => MainContent.Content = new MenuPage(this);
        public void GotToReservationsPage() => MainContent.Content = new ReservationsPage(this);
    }
}
