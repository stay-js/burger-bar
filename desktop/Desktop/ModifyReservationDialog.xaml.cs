using Desktop_Lib;
using System.Windows;

namespace Desktop
{
    public partial class ModifyReservationDialog : Window
    {
        public ModifyReservationDialog(ReservationItem? item)
        {
            InitializeComponent();

            if (item is null)
            {
                Title = "Foglalás létrehozása";
                return;
            }

            Name.Text = item.Name;
            Email.Text = item.Email;
            PhoneNumber.Text = item.Phone;
            Date.SelectedDate = item.Date;
            Time.Text = item.Date.ToShortTimeString();
            People.Text = item.People.ToString();
            Title = "Foglalás módosítása";
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(Name.Text)
                || string.IsNullOrWhiteSpace(Email.Text)
                || string.IsNullOrWhiteSpace(PhoneNumber.Text)
                || string.IsNullOrWhiteSpace(Time.Text)
                || string.IsNullOrWhiteSpace(People.Text)
                || Date.SelectedDate is null)
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
