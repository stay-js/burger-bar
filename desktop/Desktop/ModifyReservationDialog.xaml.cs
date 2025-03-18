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
            Time.Text = item.Time;
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

            try
            {
                int[] parts = Time.Text.Split(':').Select(int.Parse).ToArray();

                if (parts.Length != 2 || parts[0] < 0 || parts[0] > 23 || parts[1] < 0 || parts[1] > 59)
                {
                    MessageBoxHelper.InvalidTimeWarning();
                    return;
                }
            }
            catch
            {
                MessageBoxHelper.InvalidTimeWarning();
                return;
            }

            if (!int.TryParse(People.Text, out _))
            {
                MessageBoxHelper.InvalidPeopleCountWarning();
                return;
            }

            DialogResult = true;
        }
    }
}
