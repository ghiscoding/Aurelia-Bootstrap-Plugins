using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace AureliaDemo
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var host = new WebHostBuilder()
          .UseKestrel()
          .UseUrls("http://localhost:9000")
          .UseContentRoot(Directory.GetCurrentDirectory())
          .UseIISIntegration()
          .UseStartup<Startup>()
          .Build();

      host.Run();
    }
  }
}
