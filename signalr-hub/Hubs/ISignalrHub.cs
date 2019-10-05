using SignalRDemo.Models;
using System.Threading.Tasks;

namespace SignalRDemo.Hubs
{
    public interface ISignalrHub
    {
        Task ItemUpdated(Item item);
    }
}