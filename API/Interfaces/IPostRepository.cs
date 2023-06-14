using API.Models;

namespace API.Interfaces
{
    public interface IPostRepository
    {
        ICollection<Post> GetPosts(string username);
        Task<bool> CreateNewsPost(Post post);
    }
}