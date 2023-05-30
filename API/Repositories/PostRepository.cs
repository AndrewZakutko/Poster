using API.Data;
using API.Interfaces;
using API.Models;

namespace API.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;
        public PostRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Post> GetAll()
        {
            return _context.Posts.ToList();
        }
    }
}