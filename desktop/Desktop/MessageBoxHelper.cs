using System.Windows;

namespace Desktop
{
    static class MessageBoxHelper
    {
        public static void ModifyMoreThanOneWarning()
        {
            MessageBox.Show("Egyszerre csak egy elemet lehet módosítani!",
                "Figyelmezetés",
                MessageBoxButton.OK,
                MessageBoxImage.Warning);
        }

        public static MessageBoxResult DeleteConfirmation()
        {
            return MessageBox.Show("Biztosan törölni szeretné a kijelölt eleme(ke)t?",
                "Elem(ek) törlése",
                MessageBoxButton.YesNo);
        }
    }
}
