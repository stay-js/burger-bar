using System.Collections.ObjectModel;
using System.Text;
using System.Windows;
using System.Windows.Controls;

namespace Desktop
{
    public partial class OrderPage : UserControl
    {
        private readonly MainWindow _mainWindow;

        private readonly ObservableCollection<OrderItem> _orders = [];

        private void BackToMainMenu_Click(object sender, RoutedEventArgs e) =>
            _mainWindow.GoBackToMainMenu();

        public OrderPage(MainWindow mainWindow)
        {
            InitializeComponent();

            _mainWindow = mainWindow;
            Order.ItemsSource = _orders;

            _ = LoadMenu();
        }

        private async Task LoadMenu()
        {
            try
            {
                var items = await _mainWindow
                    .ApiClient
                    .GetAsync<Desktop_Lib.MenuItem[]>("/api/menu");

                Item.ItemsSource = items;
                Item.SelectedIndex = 0;
            }
            catch (Exception ex)
            {
                MessageBoxHelper.Error(ex.Message);
            }
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            if (Item.SelectedValue is not Desktop_Lib.MenuItem selected)
            {
                MessageBoxHelper.EmptyFieldsWarning();
                return;
            }

            if (!Desktop_Lib.Validator.ValidateInt(Amount.Text))
            {
                MessageBoxHelper.InvalidAmountWarning();
                return;
            }

            _orders.Add(new OrderItem(selected, int.Parse(Amount.Text)));
            Amount.Text = "1";
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            var selectedItems = Order.SelectedItems.Cast<OrderItem>().ToList();

            foreach (var item in selectedItems)
            {
                _orders.Remove(item);
            }
        }

        public void CreateReceipt_Click(object sender, RoutedEventArgs e)
        {
            if (_orders.Count == 0) return;

            var sb = new StringBuilder();

            sb.AppendLine($"Termékek: {_orders.Count}\n");

            foreach (var item in _orders)
            {
                sb.AppendLine($"{item.Amount} db {item.Item} - Fizetendő: {item.Total:C0}");
            }

            sb.AppendLine($"\nÖsszesen: {_orders.Sum(x => x.Total):C0}");

            MessageBox.Show(sb.ToString(), "Számla");
        }

        public record OrderItem(Desktop_Lib.MenuItem Item, int Amount)
        {
            public int Total => Item.Price * Amount;
        }
    }
}
