﻿using System.Windows;

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

        public static void InvalidPriceWarning()
        {
            MessageBox.Show("Az ár csak egész szám lehet!",
                "Figyelmezetés",
                MessageBoxButton.OK,
                MessageBoxImage.Warning);
        }

        public static void EmptyFieldsWarning()
        {
            MessageBox.Show("Minden mező kitöltése kötelező!",
                "Figyelmezetés",
                MessageBoxButton.OK,
                MessageBoxImage.Warning);
        }

        public static void InvalidTimeWarning()
        {
            MessageBox.Show("Hibás időpont!",
                "Figyelmezetés",
                MessageBoxButton.OK,
                MessageBoxImage.Warning);
        }

        public static void InvalidPeopleCountWarning()
        {
            MessageBox.Show("A vendégek száma csak egész szám lehet!",
                "Figyelmezetés",
                MessageBoxButton.OK,
                MessageBoxImage.Warning);
        }

        public static void InvalidAmountWarning()
        {
            MessageBox.Show("Az mennyiség csak egész szám lehet!",
                "Figyelmezetés",
                MessageBoxButton.OK,
                MessageBoxImage.Warning);
        }

        public static void InvalidEmailWarning()
        {
            MessageBox.Show("Hibás e-mail cím!",
                "Figyelmezetés",
                MessageBoxButton.OK,
                MessageBoxImage.Warning);
        }

        public static void InvalidPhoneNumberWarning()
        {
            MessageBox.Show("Hibás telefonszám!",
                "Figyelmezetés",
                MessageBoxButton.OK,
                MessageBoxImage.Warning);
        }

        public static void Error(string message)
        {
            MessageBox.Show(message,
                "Hiba",
                MessageBoxButton.OK,
                MessageBoxImage.Error);
        }
    }
}
