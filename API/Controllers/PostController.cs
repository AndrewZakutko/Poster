using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Models;

namespace API.Controllers
{
    public class PostController : BaseApiController
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet("list")]
        public ICollection<Post> GetAll()
        {
            return _postRepository.GetAll();
        }
    }
}