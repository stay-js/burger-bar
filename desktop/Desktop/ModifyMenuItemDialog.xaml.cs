using Desktop_Lib;
using System.Windows;

namespace Desktop
{
    public partial class ModifyMenuItemDialog : Window
    {
        public ModifyMenuItemDialog(MenuItem? item)
        {
            InitializeComponent();

            if (item is null) return;

            ItemName.Text = item.Name;
            Price.Text = item.Price.ToString();
            Description.Text = item.Description;
            Image.Text = item.Image;
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(ItemName.Text)
                || string.IsNullOrWhiteSpace(Price.Text)
                || string.IsNullOrWhiteSpace(Description.Text)
                || string.IsNullOrWhiteSpace(Image.Text))
            {
                MessageBoxHelper.EmptyFieldsWarning();
                return;
            }

            if (!Validator.ValidateInt(Price.Text))
            {
                MessageBoxHelper.InvalidPriceWarning();
                return;
            }

            DialogResult = true;
        }
    }
}
