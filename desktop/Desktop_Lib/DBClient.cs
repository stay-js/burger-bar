using MySql.Data.MySqlClient;
using System.Data;

namespace Desktop_Lib
{
    public class DBClient(string server, string database, string username, string password)
    {
        private readonly string _connectionString = $"Server={server};Database={database};User Id={username};Password={password};";

        public MySqlConnection GetConnection() => new(_connectionString);

        public DataTable ExecuteQuery(string query)
        {
            using var conn = GetConnection();
            conn.Open();

            using var cmd = new MySqlCommand(query, conn);
            using var adapter = new MySqlDataAdapter(cmd);

            var dt = new DataTable();
            adapter.Fill(dt);

            return dt;
        }
    }
}
