namespace Desktop_Lib
{
    public static class DotEnv
    {
        public static void Load(string filePath)
        {
            if (!File.Exists(filePath)) return;

            foreach (string line in File.ReadAllLines(filePath))
            {
                string[] parts = line.Split('=', StringSplitOptions.RemoveEmptyEntries);

                if (parts.Length != 2) continue;

                string value = parts[1].Replace("'", "").Replace("\"", "");

                Environment.SetEnvironmentVariable(parts[0], value);
            }
        }
    }
}
