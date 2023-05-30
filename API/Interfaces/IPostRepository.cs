using API.Models;

namespace API.Interfaces
{
    public interface IPostRepository
    {
       ICollection<Post> GetAll();
    }
}