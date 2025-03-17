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
        }
    }
}
