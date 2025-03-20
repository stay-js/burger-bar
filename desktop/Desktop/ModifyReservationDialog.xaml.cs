using Desktop_Lib;
using System.Windows;

namespace Desktop
{
    public partial class ModifyReservationDialog : Window
    {
        public ModifyReservationDialog(ReservationItem item)
        {
            InitializeComponent();

            Date.SelectedDate = item.Date;
            Time.Text = item.Date.ToShortTimeString();
            People.Text = item.People.ToString();
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            if (Date.SelectedDate is null
                || string.IsNullOrWhiteSpace(Time.Text)
                || string.IsNullOrWhiteSpace(People.Text))
            {
                MessageBoxHelper.EmptyFieldsWarning();
                return;
            }

            if (!Validator.ValidateTime(Time.Text))
            {
                MessageBoxHelper.InvalidTimeWarning();
                return;
            }

            if (!Validator.ValidateInt(People.Text))
            {
                MessageBoxHelper.InvalidPeopleCountWarning();
                return;
            }

            DialogResult = true;
        }
    }
}
