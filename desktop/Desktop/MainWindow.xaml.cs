using Desktop_Lib;
using System.Windows;

namespace Desktop
{
    public partial class MainWindow : Window
    {
        private readonly DBClient _dbClient;

        public MainWindow()
        {
            DotEnv.Load("../../../.env");
            _dbClient = new(Environment.GetEnvironmentVariable("MYSQL_URL") ?? "",
                    Environment.GetEnvironmentVariable("MYSQL_DATABASE") ?? "",
                    Environment.GetEnvironmentVariable("MYSQL_USER") ?? "",
                    Environment.GetEnvironmentVariable("MYSQL_PASSWORD") ?? "");

            InitializeComponent();
            MainContent.Content = new MainMenu(this);
        }

        public void GoToMenuPage() => MainContent.Content = new MenuPage(this);
        public void GotToReservationsPage() => MainContent.Content = new ReservationsPage(this);
    }
}
