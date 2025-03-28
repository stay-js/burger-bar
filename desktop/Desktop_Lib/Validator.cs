using System.ComponentModel.DataAnnotations;

namespace Desktop_Lib
{
    public static class Validator
    {
        public static bool ValidateTime(string input)
        {
            string[] parts = input.Split(':');

            if (parts.Length != 2) return false;

            int hours = int.TryParse(parts[0], out int h) ? h : -1;
            int minutes = int.TryParse(parts[1], out int m) ? m : -1;

            return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
        }

        public static bool ValidateInt(string input) => int.TryParse(input, out _);

        public static bool ValidateEmail(string input) =>
            new EmailAddressAttribute().IsValid(input);

        public static bool ValidatePhoneNumber(string input) =>
            new PhoneAttribute().IsValid(input);
    }
}
