using System.Text;
using System.Text.Json;

namespace Desktop_Lib
{
    public class ApiClient
    {
        public static readonly HttpClient HttpClient = new();

        public static string API_URL => Environment.GetEnvironmentVariable("API_URL")
            ?? "http://localhost:3000";
        public static string API_KEY => Environment.GetEnvironmentVariable("API_KEY")
            ?? "";

        private readonly JsonSerializerOptions _JsonOptions = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };

        public async Task<T> GetAsync<T>(string endpoint)
        {
            using var request = new HttpRequestMessage(HttpMethod.Get, API_URL + endpoint);

            request.Headers.Add("x-api-key", API_KEY);

            var response = await HttpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            string jsonResponse = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<T>(jsonResponse, _JsonOptions)!;
        }

        public async Task PostPutOrPatchAsync(string endpoint, HttpMethod method, object payload)
        {
            using var request = new HttpRequestMessage(method, API_URL + endpoint);

            request.Headers.Add("x-api-key", API_KEY);

            string json = JsonSerializer.Serialize(payload, _JsonOptions);
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");


            var response = await HttpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();
        }
    }
}
