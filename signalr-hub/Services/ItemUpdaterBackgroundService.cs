using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using SignalRDemo.Hubs;
using SignalRDemo.Models;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SignalRDemo.Services
{
    public class ItemUpdaterBackgroundService : BackgroundService
    {
        private readonly IHubContext<SignalrHub, ISignalrHub> _hubContext;

        public ItemUpdaterBackgroundService(IHubContext<SignalrHub, ISignalrHub> hubContext)
        {
            _hubContext = hubContext;
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            var random = new Random();
            var items = Enumerable
                .Range(0, 50)
                .Select(i => new Item { Id = i, Description = "Item" + i })
                .ToList();

            while (!cancellationToken.IsCancellationRequested)
            {
                foreach (var item in items)
                {
                    item.RandomNumber = random.Next(0, 9999);
                    await _hubContext.Clients.All.ItemUpdated(item);

                    await Task.Delay(20);
                }
            }
        }
    }
}
